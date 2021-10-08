import React from "react";
import "./App.css";
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import blue from "@material-ui/core/colors/blue";
import LoginPage from "./pages/LoginPage";
import AuthGuard from "./components/AuthGuard";
import Page from "./pages/Page";

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
          <CssBaseline />
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/">
              <AuthGuard>
                <Page/>
              </AuthGuard>
            </Route>
          </Switch>
    </ThemeProvider>
  );
}

export default App;
