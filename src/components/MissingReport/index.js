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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

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
    search: {
        marginBottom: 10,
        padding: 50,
    },

    searchRoot:{
        padding: 10,
    },
    input:{
        width:540,
    },

});


function MissingReport(props) {
    const {classes} = props;
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [seachBrand, setSearchBrand]=React.useState("");


    const [lost_livestock, setLost_livestock] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/api/get_all_lost_livestock").then((response) => {
            setLost_livestock(response.data);
        });
    }, []);

    const fiteredLivestock = lost_livestock.filter(livestock => {
        return livestock.brand.toLowerCase().includes(seachBrand.toLowerCase());
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
                <Grid item xs={12}>
                    <div className={classes.search}>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search your brand..."
                                onChange={(e) => setSearchBrand(e.target.value)}
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search"
                                        onClick={e => setSearchBrand(e.target.value)}
                            >
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </div>
                </Grid>

                <TableContainer component={Paper}>

                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>N0.</TableCell>
                                <TableCell align="left">Kind</TableCell>
                                <TableCell align="left">Breed</TableCell>
                                <TableCell align="left">Brand</TableCell>
                                <TableCell align="left">Colour</TableCell>
                                <TableCell align="left">Age</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {fiteredLivestock.map((val) => (

                                    <TableRow key={val.idlost_livestock}>
                                        <TableCell component="th" scope="row">
                                            {val.idlost_livestock}
                                        </TableCell>
                                        <TableCell align="left">{val.kind}</TableCell>
                                        <TableCell align="left">{val.breed}</TableCell>
                                        <TableCell align="left">{val.brand}</TableCell>
                                        <TableCell align="left">{val.colour}</TableCell>
                                        <TableCell align="left">{val.age}</TableCell>
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

export default withRouter(withStyles(styles)(MissingReport));
