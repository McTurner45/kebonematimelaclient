import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/Dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/report_buffer">
      <ListItemIcon>
        <ReportProblemIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItem>
    <ListItem button component={Link} to="/generate_report">
      <ListItemIcon>
        <FindInPageIcon />
      </ListItemIcon>
      <ListItemText primary="Generate Reports" />
    </ListItem>
  </div>
);
