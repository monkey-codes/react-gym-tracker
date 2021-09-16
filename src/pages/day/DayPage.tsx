import React from "react";
import Page from "../Page";
import { DayContextProvider } from "./DayContextProvider";
import { Container, Paper } from "@material-ui/core";
import DayHeading from "./DayHeading";
import ExerciseGroupStepper from "./ExerciseGroupStepper";

const DayPage: React.FC = (props) => {
  return (
    <Page>
      <DayContextProvider>
        <Container maxWidth="sm">
          <Paper>
            <DayHeading />
            <ExerciseGroupStepper />
          </Paper>
        </Container>
      </DayContextProvider>
    </Page>
  );
};

export default DayPage;
