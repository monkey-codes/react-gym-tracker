import React from "react";

type Program = {
  name: string;
  weeks: Week[];
};
export type Week = {
  id: number;
  name: string;
  theme: string;
  days: Day[];
};

export type Day = {
  id: number;
  name: string;
  exerciseGroups: ExerciseGroup[];
};

type ExerciseGroup = {
  name: string;
  description: string;
  sets: number;
  exercises: Exercise[];
};

type Exercise = {
  name: string;
  reps: number;
};

let arms = {
  id: 0,
  name: "Arms",
  exerciseGroups: [
    {
      name: "Rope Extensions",
      description:
        " 2 Sets/ Rest Pause to 100 reps. Pick a weight you can get around 30 reps on the initial attempt",
      sets: 2,
      exercises: [
        {
          name: "Rope Extensions",
          reps: 100,
        },
      ],
    },
    {
      name: "Incline skull crusher & Seated French Press",
      description:
        "3 Sets/ 20 reps. Weight should make you fail at around 20, don't just stop",
      sets: 3,
      exercises: [
        {
          name: "Incline Skull Crusher",
          reps: 20,
        },
        {
          name: "Seated French press (Partial at the bottom)",
          reps: 20,
        },
      ],
    },
    {
      name: "Cable French Press, Overhead Rope extension",
      description:
        "3 Sets/ 20 reps. Weight should make you fail at around 20 reps, don't just stop",
      sets: 3,
      exercises: [
        {
          name: "Cable French Press",
          reps: 20,
        },
        {
          name: "Overhead Rope Extension (Pronate Wrists)",
          reps: 20,
        },
      ],
    },
    {
      name: "Close grip Bench (Slow)",
      description:
        "3 Sets / Failure. Pick a weight you can get 20 reps with but you won't",
      sets: 3,
      exercises: [
        {
          name: "Close grip Bench (Slow)",
          reps: 20,
        },
      ],
    },
  ],
};
let defaultValue = {
  name: "Full Gym Program",
  weeks: [
    {
      id: 0,
      name: "Week 1",
      theme: "Fucked from the start",
      days: [
        arms,
        { ...arms, id: 1, name: "Shoulders" },
        { ...arms, id: 2, name: "Back" },
        { ...arms, id: 3, name: "Chest & Abs" },
        { ...arms, id: 4, name: "Legs" },
      ],
    },
  ],
};
const ProgramContext = React.createContext<Program>(defaultValue);

export const ProgramContextProvider: React.FC = (props) => {
  return (
    <ProgramContext.Provider value={defaultValue}>
      {props.children}
    </ProgramContext.Provider>
  );
};
export default ProgramContext;
