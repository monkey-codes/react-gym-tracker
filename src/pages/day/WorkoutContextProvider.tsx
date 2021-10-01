import React, { useContext, useMemo, useState } from "react";
import ProgramContext, { Day, Week } from "../../store/ProgramContextProvider";
import { useParams } from "react-router-dom";

class Workout {
  constructor(public workoutDate: Date, public programDay: Day | undefined) {}
}

const WorkoutContext = React.createContext<Workout>(
  new Workout(new Date(), undefined)
);

export const WorkoutContextProvider: React.FC = (props) => {
  const params = useParams<{ weekId: string; dayId: string }>();
  const program = useContext(ProgramContext);
  const week = useMemo<Week | undefined>(
    () => program.weeks.find((value) => value.id === parseInt(params.weekId)),
    [params.weekId, program.weeks]
  );
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const programDay = useMemo<Day | undefined>(() => {
    setWorkoutDate(new Date());
    return week?.days.find((day: Day) => day.id === parseInt(params.dayId));
  }, [week, params.dayId]);

  const workout = useMemo<Workout>(
    () => new Workout(workoutDate, programDay),
    [workoutDate, programDay]
  );

  return (
    <WorkoutContext.Provider value={workout}>
      {props.children}
    </WorkoutContext.Provider>
  );
};
export default WorkoutContext;
