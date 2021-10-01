import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { db, sync, syncBuffer } from "../firebase";
import { useInterval } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";

export type Event = {
  id: string;
  exerciseId: string;
  timestamp: number;
  set: number;
  weight: number | null;
  reps: number | null;
};

type EventsGroupedByExerciseId = {
  [key: string]: Array<Event>;
};

class ExerciseHistory {
  constructor(
    public eventsGroupedByExerciseId: EventsGroupedByExerciseId,
    private setEventsGroupedByExerciseId: Dispatch<
      SetStateAction<EventsGroupedByExerciseId>
    > = () => {},
    public syncEvent: (e: Event) => void = () => {}
  ) {}

  private eventThatOccurredToday(setNumber: number): (e: Event) => boolean {
    const start = new Date().setHours(0, 0, 0, 0);
    const end = new Date().setHours(23, 59, 59, 999);
    return (event: Event) =>
      event.set === setNumber &&
      event.timestamp >= start &&
      event.timestamp <= end;
  }

  getEvent(exerciseId: string, setNumber: number): Event {
    const newEvent = () => ({
      id: uuidv4(),
      exerciseId: exerciseId,
      set: setNumber,
      timestamp: Date.now(),
      weight: null,
      reps: null,
    });

    if (this.eventsGroupedByExerciseId[exerciseId]) {
      return (
        this.eventsGroupedByExerciseId[exerciseId].find(
          this.eventThatOccurredToday(setNumber)
        ) || newEvent()
      );
    }
    return newEvent();
  }

  public updateEvent(
    event: Event,
    fields: { weight: number | null; reps: number | null }
  ) {
    const newEvent = { ...event, ...fields };
    this.setEventsGroupedByExerciseId((prevState) => {
      const byExercise: Event[] = prevState[newEvent.exerciseId] || [];
      const existingEvent = byExercise.find(
        this.eventThatOccurredToday(event.set)
      );
      if (existingEvent) {
        return {
          ...prevState,
          [newEvent.exerciseId]: byExercise.map((value) => {
            if (value.id !== existingEvent.id) return value;
            return newEvent;
          }),
        } as EventsGroupedByExerciseId;
      }
      return {
        ...prevState,
        [newEvent.exerciseId]: [...byExercise, newEvent],
      } as EventsGroupedByExerciseId;
    });
    this.syncEvent(newEvent);
  }
}
const ExerciseHistoryContext = React.createContext<ExerciseHistory>(
  new ExerciseHistory({})
);

export const ExerciseHistoryContextProvider: React.FC = (props) => {
  const [eventsGroupedByExerciseId, setEventsGroupedByExerciseId] = useState(
    {} as EventsGroupedByExerciseId
  );
  const syncEvent = useCallback((event: Event) => {
    console.log("pushing to sync buffer", event);
    syncBuffer.push(event);
  }, []);

  useInterval(async () => {
    await sync();
  }, 5000);

  useEffect(() => {
    const getData = async () => {
      const data = await db.collection("events").get();
      const events = data.docs.reduce((acc, currentVal) => {
        const event = currentVal.data() as Event;
        (acc[event.exerciseId] = acc[event.exerciseId] || []).push(event);
        return acc;
      }, {} as EventsGroupedByExerciseId);
      setEventsGroupedByExerciseId(events);
      return events;
    };
    getData().then(console.log.bind(console));
  }, [setEventsGroupedByExerciseId]);

  const exerciseHistory = useMemo(
    () =>
      new ExerciseHistory(
        eventsGroupedByExerciseId,
        setEventsGroupedByExerciseId,
        syncEvent
      ),
    [eventsGroupedByExerciseId, setEventsGroupedByExerciseId, syncEvent]
  );
  return (
    <ExerciseHistoryContext.Provider value={exerciseHistory}>
      {props.children}
    </ExerciseHistoryContext.Provider>
  );
};

export default ExerciseHistoryContext;
