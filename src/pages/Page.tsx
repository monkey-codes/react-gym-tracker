import HeaderBar from "../components/HeaderBar";
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import DayPage from "./day/DayPage";
import {ProgramContextProvider} from "../store/ProgramContextProvider";
import {ExerciseHistoryContextProvider} from "../store/ExerciseHistoryContextProvider";

const Page: React.FC = (props) => {
  return (
    <>
      <ProgramContextProvider>
        <ExerciseHistoryContextProvider>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/week/0/day/0" />
            </Route>
            <Route path="/week/:weekId/day/:dayId">
              <HeaderBar />
              <DayPage/>
            </Route>
          </Switch>
        </ExerciseHistoryContextProvider>
      </ProgramContextProvider>
    </>
  );
};
export default Page;
