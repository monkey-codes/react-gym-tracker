import React from "react";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { ProgramContextProvider } from "./store/ProgramContextProvider";
import DayPage from "./pages/day/DayPage";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ProgramContextProvider>
        <CssBaseline />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/week/0/day/0" />
          </Route>
          <Route path="/week/:weekId/day/:dayId">
            <DayPage />
          </Route>
        </Switch>
      </ProgramContextProvider>
    </ThemeProvider>
  );
}

export default App;
