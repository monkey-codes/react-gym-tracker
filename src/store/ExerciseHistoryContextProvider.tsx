import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    private setEvents: Dispatch<SetStateAction<Event[]>>
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
      this.setEvents((prevState) => [...prevState, { ...event, ...fields }]);
      return;
    }
    this.setEvents((prevState) =>
      prevState.map((evt) => {
        if (evt.id !== event.id) return evt;
        return { ...evt, ...fields };
      })
    );
  }
}

const ExerciseHistoryContext = React.createContext<ExerciseHistory>(
  new ExerciseHistory([], () => {})
);

export const ExerciseHistoryContextProvider: React.FC = (props) => {
  const [events, setEvents] = useState(new Array<Event>());
  console.log(events);
  const exerciseHistory = useMemo(
    () => new ExerciseHistory(events, setEvents),
    [events]
  );
  return (
    <ExerciseHistoryContext.Provider value={exerciseHistory}>
      {props.children}
    </ExerciseHistoryContext.Provider>
  );
};

export default ExerciseHistoryContext;
