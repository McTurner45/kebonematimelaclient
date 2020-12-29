import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/Dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/Report">
      <ListItemIcon>
        <ReportProblemIcon />
      </ListItemIcon>
      <ListItemText primary="Report Missing" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FindInPageIcon />
      </ListItemIcon>
      <ListItemText primary="Livestock Inspection" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <VerifiedUserIcon />
      </ListItemIcon>
      <ListItemText primary="Livestock Brands" />
    </ListItem>
  </div>
);
