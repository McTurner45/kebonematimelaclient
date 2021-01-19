import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "../../listItems";
import withStyles from "@material-ui/core/styles/withStyles";
import {  withRouter } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Axios from "axios";
import {
  Typography,
  Paper,
  Button,
  FormControl,
  Input,
  InputLabel, MenuItem, Select,
} from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
    backgroundColor: theme.palette.success.main, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.success.main,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paperContents:{
    marginTop: theme.spacing.unit * 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 10}px ${
      theme.spacing.unit * 3
    }px`,
  },
  fixedHeight: {
    height: 240,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 6 * 5)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  inputLable:{
    width: 540,

  },
  
});

function ReportMissing(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setKind(event.target.value);
  };

  const handleChange1 = (event) => {
    setZone(event.target.value);
  };

  const [age, setAge] = useState("");
  const [colour, setColour] = useState("");
  const [kind, setKind] = useState("");
  const [brand, setBrand] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [zone,setZone]= useState("");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <h1>Kebone Matimela</h1>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge color="secondary" onClick={logout}>
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.main}>
      <Paper className={classes.paperContents}>
        <Typography component="h1" variant="h3">
          Report Missing or Stolen Livestock
        </Typography>
        
        <Typography component="h1" variant="h6">
          Complete the form below with the details of your missing livestock
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => e.preventDefault() && true}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="age">Livestock Age</InputLabel>
            <Input
              id="age"
              name="age"
              autoComplete="off"
              autoFocus
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="colour">Livestock Colour</InputLabel>
            <Input
              id="colour"
              name="colour"
              autoComplete="off"
              autoFocus
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel className={classes.inputLable} id="kind">Kind of your livestock</InputLabel>
            <Select
                id="kind"
                name="kind"
                value={kind}
                onChange={handleChange}
                className={classes.inputLable}
            >
              <MenuItem value={"Cow"}>Cow</MenuItem>
              <MenuItem value={"Goat"}>Goat</MenuItem>
              <MenuItem value={"Sheep"}>Sheep</MenuItem>
              <MenuItem value={"Donkey"}>Donkey</MenuItem>
              <MenuItem value={"Horse"}>Horse</MenuItem>
              <MenuItem value={"Pig"}>Pig</MenuItem>
            </Select>
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="brand">Livestock Brand</InputLabel>
            <Input
              id="brand"
              name="brand"
              autoComplete="off"
              autoFocus
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="breed">Livestock Breed</InputLabel>
            <Input
              id="breed"
              name="breed"
              autoComplete="off"
              autoFocus
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </FormControl>

          <FormControl
            margin="normal" 
            required fullWidth
          >
            <Input
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              aria-describedby="size"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText id="size">
              Weight
            </FormHelperText>
          </FormControl>
          <FormControl margin="normal">
            <InputLabel className={classes.inputLable} id="zone">Zone last seen</InputLabel>
            <Select
                id="zone"
                name="zone"
                value={zone}
                onChange={handleChange1}
                className={classes.inputLable}
            >
              <MenuItem value={"C1"}>C1</MenuItem>
              <MenuItem value={"C2"}>C2</MenuItem>
              <MenuItem value={"C3"}>C3</MenuItem>
              <MenuItem value={"C4"}>C4</MenuItem>
              <MenuItem value={"C5"}>C5</MenuItem>
              <MenuItem value={"C6"}>C6</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onReport}
            className={classes.submit}
          >
            Report
          </Button>
        </form>
      </Paper>
      </main>
    </div>
  );

  async function onReport() {
    console.log(age);
    try {
      Axios.post("https://kebonematimela.herokuapp.com/api/report/missing", {
        animalage: age,
        colour: colour,
        kind: kind,
        brand: brand,
        breed: breed,
        size: size,
        zone: zone,

      }).then(() => {
        alert("Reported");
        props.history.push("/report/missing");
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async function logout() {
    props.history.push("/");
  }
}

export default withRouter(withStyles(styles)(ReportMissing));
