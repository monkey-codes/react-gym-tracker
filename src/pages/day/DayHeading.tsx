import React, { useContext } from "react";
import WorkoutContext from "./WorkoutContextProvider";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resetContainer: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(3),
      marginBottom: 0,
    },
  })
);

const DayHeading: React.FC = (props) => {
  const classes = useStyles();
  const { programDay } = useContext(WorkoutContext);
  return (
    <div className={classes.resetContainer}>
      <Typography variant="h5">{programDay?.name}</Typography>
    </div>
  );
};

export default DayHeading;
