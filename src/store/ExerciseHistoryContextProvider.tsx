import React, {
  Dispatch,
  SetStateAction,
  useCallback, useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { useInterval } from "usehooks-ts";

export type Event = {
  id: string;
  exerciseId: string;
  timestamp: number;
  set: number;
  weight: number | null;
  reps: number | null;
};

export class ExerciseHistory {
  constructor(
    private events: Event[],
    private setEvents: Dispatch<SetStateAction<Event[]>>,
    private onEventCreated: (event: Event) => void = () => {},
    private onEventUpdated: (event: Event) => void = () => {}
  ) {}

  getEvent(exerciseId: string, setNumber: number): Event {
    const start = new Date().setHours(0, 0, 0, 0);
    const end = new Date().setHours(23, 59, 59, 999);
    const event = this.events.find((event) => {
      return (
        event.exerciseId === exerciseId &&
        event.set === setNumber &&
        event.timestamp > start &&
        event.timestamp < end
      );
    });
    if (!event) {
      const newEvent = {
        id: uuidv4(),
        exerciseId: exerciseId,
        set: setNumber,
        timestamp: Date.now(),
        weight: null,
        reps: null,
      };
      return newEvent;
    }
    return event;
  }

  public updateEvent(
    event: Event,
    fields: { weight: number | null; reps: number | null }
  ) {
    if (!this.events.find(({ id }) => id === event.id)) {
      let newEvent = { ...event, ...fields };
      this.setEvents((prevState) => [...prevState, newEvent]);
      this.onEventCreated(newEvent);
      return;
    }
    this.setEvents((prevState) =>
      prevState.map((evt) => {
        if (evt.id !== event.id) return evt;
        let updatedEvent = { ...evt, ...fields };
        this.onEventUpdated(updatedEvent);
        return updatedEvent;
      })
    );
  }
}

const ExerciseHistoryContext = React.createContext<ExerciseHistory>(
  new ExerciseHistory([], () => {})
);

const syncBuffer = new Array<Event>();

const sync = async () => {
  if (syncBuffer.length === 0) return;
  const copy = syncBuffer.splice(0, syncBuffer.length);
  // only look at the most recent updates
  const latestEventsForIdOnly = copy.reduce<{[key: string]: Event}>((acc, current) => {
    acc[current.id] = current;
    return acc;
  }, {});
  // sort chronologically
  const events = Object.values(latestEventsForIdOnly).sort((a: Event, b: Event) => a.timestamp - b.timestamp)
  const batch = db.batch();
  events.forEach(event => {
    batch.set(db.collection("events").doc(event.id), event)
  });
  console.log(`syncing ${events.length} events...`);
  await batch.commit();
};

export const ExerciseHistoryContextProvider: React.FC = (props) => {
  const [events, setEvents] = useState(new Array<Event>());
  const syncEvents = useCallback(async (event: Event) => {
    syncBuffer.push(event);
  }, []);

  useInterval(async () => {
    await sync();
  }, 10000);

  useEffect( () => {
    const getData = async () => {
     const data = await db.collection('events').get();
     setEvents(data.docs.map<Event>(value => value.data() as Event));
    };
    getData();
  }, [setEvents]);
  console.log(events);
  const exerciseHistory = useMemo(
    () => new ExerciseHistory(events, setEvents, syncEvents, syncEvents),
    [events, syncEvents]
  );
  return (
    <ExerciseHistoryContext.Provider value={exerciseHistory}>
      {props.children}
    </ExerciseHistoryContext.Provider>
  );
};

export default ExerciseHistoryContext;
// const program = useContext(ProgramContext);
// useEffect(() => {
//   console.log('use effect')
//   const calendarDays = 10;
//   const msInADay = 1000*60*60*24;
//   var today = new Date().setHours(0,0,0,0);
//
//
//   var data = Array(calendarDays).fill(0).map((value, index) => today - (msInADay * index)).flatMap(timestamp =>
//     program.weeks.flatMap(week => week.days
//       .flatMap(day => day.exerciseGroups
//         .flatMap(exerciseGroup => exerciseGroup.exercises.flatMap(exercise => Array(exerciseGroup.sets).fill(0)
//           .map((value, zeroBasedSet) => {
//             const e: Event = {
//               id: uuidv4(),
//               exerciseId: exercise.id,
//               timestamp: timestamp+(1000*60*2),
//               set: zeroBasedSet,
//               weight: 1,
//               reps: 1,
//             }
//             return e;
//           } ))))));
//     console.log(data[10]);
//
// },[]);
