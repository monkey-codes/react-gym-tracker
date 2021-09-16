import React from "react";
import { ExerciseGroup } from "../../store/ProgramContextProvider";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  MobileStepper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ExerciseForm from "./ExerciseForm";

type ExerciseGroupProps = {
  exerciseGroup: ExerciseGroup;
};

const ExerciseGroupContainer: React.FC<ExerciseGroupProps> = ({
  exerciseGroup,
}) => {
  const [activeSet, setActiveSet] = React.useState(0);
  const handleNext = () => {
    setActiveSet((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveSet((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {exerciseGroup.description}
            </Typography>
          </Grid>
          {exerciseGroup.exercises.map((exercise) => (
            <ExerciseForm key={`${exercise.name}-${activeSet}`} exercise={exercise} activeSet={activeSet}/>
          ))}
          <Grid item xs={12}>
            <MobileStepper
              steps={exerciseGroup.sets}
              position="static"
              variant="text"
              activeStep={activeSet}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeSet === exerciseGroup.sets - 1}
                >
                  Next Set
                  <KeyboardArrowRightIcon />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeSet === 0}
                >
                  <KeyboardArrowLeftIcon />
                  Previous Set
                </Button>
              }
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ExerciseGroupContainer;
