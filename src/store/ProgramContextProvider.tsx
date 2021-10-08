import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export type Program = {
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

let defaultValue: Program = {
  name: "Default Program",
  weeks: [
    {
      id: 0,
      name: "Week 1",
      theme: "Default Week 1",
      days: [
        {
          id: 0,
          name: "Day 1",
          exerciseGroups: [
            {
              name: "group 1",
              sets: 2,
              description: "group 1",
              exercises: [
                {
                  name: "Squats",
                  id: "80E2C88B-51E7-4283-9E21-28389ACF8362",
                  type: ExerciseType.WEIGHT_AND_REPS,
                  reps: 20,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const ProgramContext = React.createContext<Program>(defaultValue);

export const ProgramContextProvider: React.FC = (props) => {
  // useEffect(() => {
  //   const saveProgram = async () =>{
  //     await setDoc(doc(db, "programs", fullGymProgram.name), fullGymProgram);
  //   };
  //   saveProgram();
  // }, [])
  const [program, setProgram] = useState<Program | null>(null);
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "programs", "Full Gym Program");
      const docSnap = await getDoc(docRef);
      const program = docSnap.data() as Program;

      setProgram(program);
      return program;
    };
    getData().then(console.log.bind(console));
  }, [setProgram]);

  return (
    <ProgramContext.Provider value={program!}>
      {program && props.children}
    </ProgramContext.Provider>
  );
};
export default ProgramContext;
