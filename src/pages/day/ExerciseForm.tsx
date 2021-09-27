import { Exercise, ExerciseType } from "../../store/ProgramContextProvider";
import {
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useContext, useMemo } from "react";
import ExerciseHistoryContext from "../../store/ExerciseHistoryContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      // height: 100,
      marginBottom: theme.spacing(2),
    },
  })
);

const ExerciseForm: React.FC<{ exercise: Exercise; activeSet: number }> = ({
  exercise,
  activeSet,
}) => {
  const classes = useStyles();
  const exerciseHistory = useContext(ExerciseHistoryContext);
  const event = useMemo(() => {
    return exerciseHistory.getEvent(exercise.id, activeSet);
  }, [exerciseHistory, exercise.id, activeSet]);

  function weightBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    exerciseHistory.updateEvent(event, {
      weight: +e.target.value,
      reps: event.reps,
    });
  }

  function repsBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    exerciseHistory.updateEvent(event, {
      reps: +e.target.value,
      weight: event.weight,
    });
  }

  return (
    <>
      <div className={classes.item}>
        <Typography variant="body2">{exercise.name}</Typography>
      </div>
      {exercise.type === ExerciseType.WEIGHT_AND_REPS && (
        <div className={classes.item}>
          <TextField
            size="small"
            fullWidth
            label="Weight"
            variant="outlined"
            type="number"
            value={event.weight || ""}
            onChange={weightBlurHandler}
          />
        </div>
      )}
      {(exercise.type === ExerciseType.WEIGHT_AND_REPS ||
        exercise.type === ExerciseType.REPS_ONLY) && (
        <div className={classes.item}>
          <TextField
            size="small"
            fullWidth
            label="Reps"
            variant="outlined"
            type="number"
            value={event.reps || ""}
            onChange={repsBlurHandler}
          />
        </div>
      )}
    </>
  );
};

export default ExerciseForm;
