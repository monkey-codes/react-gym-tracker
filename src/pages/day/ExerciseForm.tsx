import {Exercise} from "../../store/ProgramContextProvider";
import {Grid, TextField, Typography} from "@material-ui/core";
import React from "react";

const ExerciseForm: React.FC<{exercise: Exercise, activeSet: number}> =  ({exercise, activeSet}) => {
  return  <>
    <Grid item xs={12}>
      <Typography variant="h6">
        {exercise.name} - Set {activeSet + 1}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Weight"
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Reps"
        variant="outlined"
      />
    </Grid>
  </>
};

export default ExerciseForm;
