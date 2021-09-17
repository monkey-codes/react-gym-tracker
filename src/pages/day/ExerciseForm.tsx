import {Exercise} from "../../store/ProgramContextProvider";
import {createStyles, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      // height: 100,
      marginBottom: theme.spacing(2)
    }
  })
);

const ExerciseForm: React.FC<{exercise: Exercise, activeSet: number}> =  ({exercise, activeSet}) => {
  const classes = useStyles();

  return  <>
    <div className={classes.item}>
      <Typography variant="body2">
        {exercise.name}
      </Typography>
    </div>
    <div className={classes.item}>
      <TextField
        fullWidth
        label="Weight"
        variant="outlined"
        type="number"
      />
    </div>
    <div className={classes.item}>
      <TextField
        fullWidth
        label="Reps"
        variant="outlined"
        type="number"
      />
    </div>
  </>
};

export default ExerciseForm;
