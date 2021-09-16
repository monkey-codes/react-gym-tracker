import React from "react";
import { Week } from "../store/ProgramContextProvider";
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import { NavLink, useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    active: {
      backgroundColor: theme.palette.primary.dark,
    },
  })
);

const NavWeekItem: React.FC<{ week: Week; onNavItemClicked: () => void }> = ({
  week,
  onNavItemClicked,
}) => {
  const classes = useStyles();
  const params = useParams<{ weekId?: string }>();
  const [open, setOpen] = React.useState(params.weekId === "" + week.id);
  const expandHandler = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <ListItem button key={week.theme} onClick={expandHandler}>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary={week.name} secondary={week.theme} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {week.days.map((day) => (
            <ListItem
              button
              onClick={onNavItemClicked}
              className={classes.nested}
              activeClassName={classes.active}
              component={NavLink}
              to={`/week/${week.id}/day/${day.id}`}
            >
              <ListItemIcon>
                <FitnessCenter />
              </ListItemIcon>
              <ListItemText primary={day.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavWeekItem;
