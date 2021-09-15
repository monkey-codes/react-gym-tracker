import React from "react";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

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
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>Hello world</h1>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
