import React from "react";
import { ExerciseGroup } from "../../store/ProgramContextProvider";
import { Button, Grid, MobileStepper, Typography } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import ExerciseForm from "./ExerciseForm";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

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

  const handleSwipe = (e: any, i: any) => {
    setActiveSet(e);
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2">
              {exerciseGroup.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SwipeableViews index={activeSet} onChangeIndex={handleSwipe}>
              {[...new Array(exerciseGroup.sets)].map((e, set) => {
                return (
                  <div key={`${exerciseGroup.name}-${set}`}>
                    <Typography variant={"subtitle1"}>
                      Set {activeSet + 1}
                    </Typography>
                    {exerciseGroup.exercises.map((exercise) => (
                      <ExerciseForm
                        key={`${exercise.name}-${set}`}
                        exercise={exercise}
                        activeSet={set}
                      />
                    ))}
                  </div>
                );
              })}
            </SwipeableViews>
          </Grid>
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
                  + Set
                  <KeyboardArrowRightIcon />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeSet === 0}
                >
                  <KeyboardArrowLeftIcon />- Set
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
