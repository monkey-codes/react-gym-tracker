import React from "react";
import Page from "../Page";
import { WorkoutContextProvider } from "./WorkoutContextProvider";
import {
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import DayHeading from "./DayHeading";
import ExerciseGroupStepper from "./ExerciseGroupStepper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const DayPage: React.FC = (props) => {
  const classes = useStyles();
  return (
    <Page>
      <WorkoutContextProvider>
        <Container maxWidth="sm">
          <Paper className={classes.container}>
            <DayHeading />
            <ExerciseGroupStepper />
          </Paper>
        </Container>
      </WorkoutContextProvider>
    </Page>
  );
};

export default DayPage;
