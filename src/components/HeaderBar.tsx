import React from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderBar: React.FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const openButtonHandler = () => {
    setOpen(true);
  };
  const closeButtonHandler = () => {
    setOpen(false);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openButtonHandler}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GymTracker
          </Typography>
        </Toolbar>
      </AppBar>
      <NavDrawer open={open} onClose={closeButtonHandler} />
    </div>
  );
};

export default HeaderBar;
