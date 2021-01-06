import React, {useEffect, useState} from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {mainListItems} from "../listItems";
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";

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
        alignItems: "center",
        padding: `${theme.spacing.unit * 15}px ${theme.spacing.unit * 25}px ${
            theme.spacing.unit * 20
        }px`,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: "center",
    },
    card: {
        marginRight: 30,
        width: 300,
    },
    table: {
        minWidth: 650,
    },
    zonesBtn: {
        marginBottom: 10,
    },

});


function ReportAnimalZone(props) {
    const {classes} = props;
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [zone, setZone] = React.useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [lost_livestock, setLost_livestock] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/api/get_all_livestock").then((response) => {
            setLost_livestock(response.data);
        });
    }, []);

    const fiteredLivestock = lost_livestock.filter(livestock => {
        return livestock.zone.toLowerCase().includes(zone.toLowerCase());
    })


    return (
        <div className={classes.root}>
            <CssBaseline/>
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
                        <MenuIcon/>
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
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge color="secondary" onClick={logout}>
                            <ExitToAppIcon/>
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
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <List>{mainListItems}</List>
            </Drawer>

            <main className={classes.content}>
                <Button variant="outlined" className={classes.zonesBtn} aria-controls="Select Zone"
                        aria-haspopup="true" onClick={handleClick}>
                    Select Zone
                </Button>


                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => setZone("C1")}>C1</MenuItem>
                    <MenuItem onClick={() => setZone("C2")}>C2</MenuItem>
                    <MenuItem onClick={() => setZone("C3")}>C3</MenuItem>
                    <MenuItem onClick={() => setZone("C4")}>C4</MenuItem>
                    <MenuItem onClick={() => setZone("C5")}>C5</MenuItem>
                    <MenuItem onClick={() => setZone("C6")}>C6</MenuItem>
                    <MenuItem onClick={() => setZone("C7")}>C7</MenuItem>
                    <MenuItem onClick={() => setZone("C8")}>C8</MenuItem>

                </Menu>

                <TableContainer component={Paper}>

                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>N0.</TableCell>
                                <TableCell align="right">Kind</TableCell>
                                <TableCell align="right">Breed</TableCell>
                                <TableCell align="right">Brand</TableCell>
                                <TableCell align="right">Colour</TableCell>
                                <TableCell align="right">Age</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {fiteredLivestock.map((val) => (

                                    <TableRow key={val.idlost_livestock}>
                                        <TableCell component="th" scope="row">
                                            {val.idlost_livestock}
                                        </TableCell>
                                        <TableCell align="right">{val.kind}</TableCell>
                                        <TableCell align="right">{val.breed}</TableCell>
                                        <TableCell align="right">{val.brand}</TableCell>
                                        <TableCell align="right">{val.colour}</TableCell>
                                        <TableCell align="right">{val.age}</TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </main>
        </div>
    );

    async function logout() {
        props.history.push("/");
    }
}

export default withRouter(withStyles(styles)(ReportAnimalZone));
