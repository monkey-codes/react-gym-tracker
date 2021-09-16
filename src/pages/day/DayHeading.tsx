import React, { useContext } from "react";
import DayContext from "./DayContextProvider";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resetContainer: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(3),
      marginBottom: 0
    },
  })
);

const DayHeading: React.FC = (props) => {
  const classes = useStyles();
  const day = useContext(DayContext);
  return <h2 className={classes.resetContainer}>{day?.name}</h2>;
};

export default DayHeading;
