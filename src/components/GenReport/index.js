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
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {mainListItems} from "../listItems";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link, withRouter} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import three from "../Static/images/cards/three.png";
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
    content: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.

        padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    card: {
        height: 240,
        width: 250,
        marginRight: 10,
    },
    cards: {
        marginLeft: 10,
        marginTop: -90,
    },
    image: {
        marginLeft: 10,
    }

});

function GenReport(props) {
    const {classes} = props;
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    Axios.defaults.withCredentials = true;

    const [loginStatus, setLoginStatus] = useState("")

    useEffect(() => {
        Axios.get("http://localhost:3002/api/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0])
            } else {
                props.history.push("/");
            }
        })
    }, [])

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
                <div className={classes.image}>
                    <img src={three} alt="Logo"/>
                </div>
                <Grid container spacing={2}>

                    <Grid item xs={12}>

                        <Grid container className={classes.cards} spacing={10}>

                            <Card className={classes.card}>
                                <CardActionArea component={Link} to="/reports/missing_from_zone">

                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            Zonal Records
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h5">
                                            Generate a report of all animals that have been reported as matimela in a
                                            particular zone
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                            <Card className={classes.card}>
                                <CardActionArea component={Link} to="/reports/history_of_a_brand">

                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            Brand History Records
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h5">
                                            Generate a report on all animals reported that match the brand of any
                                            particular farmer
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={classes.card}>
                                <CardActionArea component={Link} to="/reports/report_of_missing">
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            Missing Country Wide
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h5">
                                            Generate a report of all animals that have been reported as matimela and
                                            have not been found yet country wide
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                            <Card className={classes.card}>
                                <CardActionArea component={Link} to="/reports/report_of_found">

                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            Found Country Wide
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h5">
                                            Generate a report of all animals that have been reported as matimela, found
                                            and returned to the owners country wide
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </div>
    );

    async function logout() {
        Axios.get("http://localhost:3002/api/logount").then(() => {
            props.history.push("/");
        })
    }
}

export default withRouter(withStyles(styles)(GenReport));
