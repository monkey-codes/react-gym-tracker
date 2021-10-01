import {Exercise, ExerciseType} from "../../store/ProgramContextProvider";
import {
  createStyles,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, {useContext, useMemo, useState} from "react";
import ExerciseHistoryContext, {Event as ExerciseEvent} from "../../store/ExerciseHistoryContextProvider";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      // height: 100,
      marginBottom: theme.spacing(2),
    },
    infoButton: {
      padding: 0
    }
  })
);

const ExerciseForm: React.FC<{ exercise: Exercise; activeSet: number }> = ({
  exercise,
  activeSet,
}) => {
  const classes = useStyles();
  const exerciseHistory = useContext(ExerciseHistoryContext);
  const [infoDrawer, setInfoDrawer] = useState(false);
  const event: ExerciseEvent = useMemo(() => {
    return exerciseHistory.getEvent(exercise.id, activeSet);
  }, [exerciseHistory, exercise.id, activeSet]);

  const mostRecentHistory = useMemo(() => {
    return (exerciseHistory.eventsGroupedByExerciseId[event.exerciseId] || [])
      .filter((value) => value.set === event.set)
      .slice()
      .reverse();
  }, [exerciseHistory, event]);

  function weightChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    exerciseHistory.updateEvent(event, {
      weight: +e.target.value,
      reps: event.reps,
    });
  }

  function repsChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    exerciseHistory.updateEvent(event, {
      reps: +e.target.value,
      weight: event.weight,
    });
  }

  function toggleDrawer() {
    setInfoDrawer(!infoDrawer);
  }

  return (
    <>
      <div className={classes.item}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={0}>
          <Grid item xs={10}>
            <Typography variant="body2">{exercise.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton className={classes.infoButton} onClick={toggleDrawer} aria-label="delete">
              <InfoOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
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
            onChange={weightChangeHandler}
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
            onChange={repsChangeHandler}
          />
        </div>
      )}
      <Drawer anchor="bottom" open={infoDrawer} onClose={toggleDrawer}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography color="textPrimary" variant="body1">
                    {exercise.name} History (Set {activeSet + 1})
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Reps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mostRecentHistory.map((historicEvent: ExerciseEvent) => (
                <TableRow key={historicEvent.id}>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(historicEvent.timestamp).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="textSecondary">
                      {historicEvent.weight}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="textSecondary">
                      {historicEvent.reps}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Drawer>
    </>
  );
};

export default ExerciseForm;
