import React from "react";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { ProgramContextProvider } from "./store/ProgramContextProvider";
import DayPage from "./pages/day/DayPage";
import { Redirect, Route, Switch } from "react-router-dom";
import blue from "@material-ui/core/colors/blue";
import { ExerciseHistoryContextProvider } from "./store/ExerciseHistoryContextProvider";
function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: "dark",
          primary: {
            main: blue[500],
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ProgramContextProvider>
        <ExerciseHistoryContextProvider>
          <CssBaseline />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/week/0/day/0" />
            </Route>
            <Route path="/week/:weekId/day/:dayId">
              <DayPage />
            </Route>
          </Switch>
        </ExerciseHistoryContextProvider>
      </ProgramContextProvider>
    </ThemeProvider>
  );
}

export default App;
