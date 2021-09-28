import React, { useContext, useMemo } from "react";
import ProgramContext, { Day, Week } from "../../store/ProgramContextProvider";
import { useParams } from "react-router-dom";

const DayContext = React.createContext<Day | undefined>({
  name: "default",
  id: -1,
  exerciseGroups: [],
});

export const DayContextProvider: React.FC = (props) => {
  console.log('new day context');
  const params = useParams<{ weekId: string; dayId: string }>();
  const program = useContext(ProgramContext);
  const week = useMemo<Week | undefined>(
    () => program.weeks.find((value) => value.id === parseInt(params.weekId)),
    [params.weekId, program.weeks]
  );
  const day = useMemo<Day | undefined>(
    () => week?.days.find((value) => value.id === parseInt(params.dayId)),
    [week, params.dayId]
  );

  return (
    <DayContext.Provider value={day}>{props.children}</DayContext.Provider>
  );
};
export default DayContext;
