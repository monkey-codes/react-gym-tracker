import React, { useContext } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ProgramContext from "../store/ProgramContextProvider";
import NavWeekItem from "./NavWeekItem";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: 250,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
};
const NavDrawer: React.FC<NavDrawerProps> = (props) => {
  const classes = useStyles();
  const program = useContext(ProgramContext);
  const handleDrawerClose = () => {
    props.onClose();
  };
  return (
    <>
      <Drawer anchor="left" open={props.open}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
          {program.weeks.map((week) => (
            <NavWeekItem week={week} onNavItemClicked={handleDrawerClose} />
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default NavDrawer;
