import React, { useContext, useEffect } from "react";
import {
  Button,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from "@material-ui/core";
import WorkoutContext from "./WorkoutContextProvider";
import ExerciseGroupContainer from "./ExerciseGroupContainer";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      boxShadow: "unset",
    },
    actionsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      // marginRight: theme.spacing(3),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

const ExerciseGroupStepper: React.FC = (props) => {
  const classes = useStyles();
  const { programDay } = useContext(WorkoutContext);
  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(() => {
    setActiveStep(0);
  }, [programDay]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {programDay!.exerciseGroups.map((exerciseGroup, index) => (
          <Step key={index}>
            <StepLabel>{exerciseGroup.name}</StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                {activeStep !== 0 && (
                  <Grid item xs={12}>
                    <div className={classes.actionsContainer}>
                      <Fab
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={handleBack}
                        variant="circular"
                      >
                        <ArrowUpwardIcon />
                      </Fab>
                    </div>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <ExerciseGroupContainer exerciseGroup={exerciseGroup} />
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.actionsContainer}>
                    {activeStep !== programDay!.exerciseGroups.length - 1 && (
                      <Fab
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={handleNext}
                        variant="circular"
                      >
                        <ArrowDownwardIcon />
                      </Fab>
                    )}
                    {activeStep === programDay!.exerciseGroups.length - 1 && (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={handleNext}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === programDay!.exerciseGroups.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            All exercises completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default ExerciseGroupStepper;
