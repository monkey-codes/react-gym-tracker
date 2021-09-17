import React from "react";
import Page from "../Page";
import { DayContextProvider } from "./DayContextProvider";
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
      <DayContextProvider>
        <Container maxWidth="sm">
          <Paper className={classes.container}>
            <DayHeading />
            <ExerciseGroupStepper />
          </Paper>
        </Container>
      </DayContextProvider>
    </Page>
  );
};

export default DayPage;
