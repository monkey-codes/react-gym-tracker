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

export type ExerciseGroup = {
  name: string;
  description: string;
  sets: number;
  exercises: Exercise[];
};
export const enum ExerciseType {
  WEIGHT_AND_REPS,
  REPS_ONLY,
}
export type Exercise = {
  id: string;
  name: string;
  reps: number;
  type: ExerciseType;
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
          id: "CA30B01E-65EA-491D-A774-C3F90519B836",
          name: "Rope Extensions",
          reps: 100,
          type: ExerciseType.WEIGHT_AND_REPS,
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
          id: "B850102B-E94C-4404-ACF7-11FBAEEC414E",
          name: "Incline Skull Crusher",
          reps: 20,
          type: ExerciseType.WEIGHT_AND_REPS,
        },
        {
          id: "E9343945-2D37-43EF-A55D-F72AC684F75F",
          name: "Seated French press (Partial at the bottom)",
          reps: 20,
          type: ExerciseType.WEIGHT_AND_REPS,
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
          id: "77DF5E73-2F50-430A-82C8-BB76CE401F27",
          name: "Cable French Press",
          reps: 20,
          type: ExerciseType.WEIGHT_AND_REPS,
        },
        {
          id: "28ACF915-790E-4B56-A20A-DBE0780AA271",
          name: "Overhead Rope Extension (Pronate Wrists)",
          reps: 20,
          type: ExerciseType.WEIGHT_AND_REPS,
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
          id: "944AEF02-3428-4770-94E7-6FF5C43A883D",
          name: "Close grip Bench (Slow)",
          reps: 20,
          type: ExerciseType.WEIGHT_AND_REPS,
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
