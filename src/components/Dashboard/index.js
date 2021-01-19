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
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {mainListItems} from "../listItems";
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import tow from "../Static/images/cards/tow.png";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {fade} from "@material-ui/core/styles";

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 25}px ${
            theme.spacing.unit * 1
        }px`,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: "center",
    },
    paper: {
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        width: 700,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing.unit * 8,
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
            theme.spacing.unit * 3
        }px`,
    },
    fixedHeight: {
        height: 240,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '22ch',
            '&:focus': {
                width: '20ch',
            },
        },
        color: 'inherit',
    },
    card: {
        marginBottom: 20,
        alignItems: "center"
    },
    cardButons: {
        alignItems: "center"
    }, alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    searchRoot: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.25),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.55),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }
});

function Dashboard(props) {
    const {classes} = props;
    const [open, setOpen] = React.useState(true);
    const [searchBrand, setSearchBrand] = useState("");
    const [loginStatus, setLoginStatus] = useState("");


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [openDia, setOpenDia] = React.useState(false);

    const handleClose = () => {
        setOpenDia(false);
    };

    const [lost_livestock, setLost_livestock] = useState([]);

    useEffect(() => {
        Axios.get("https://kebonematimela.herokuapp.com/api/found_livestock").then((response) => {
            setLost_livestock(response.data);
        });
    }, []);

    const fiteredLivestock = lost_livestock.filter(livestock => {
        return livestock.brand.toLowerCase().includes(searchBrand.toLowerCase());
    });

    Axios.defaults.withCredentials = true;

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
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>LIVESTOCK FOUND</h1>
                        </Grid>

                        <div>
                            <Dialog
                                open={openDia}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"Steps To Claim your Animal"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Proceed to the nearest Animal control office to claim your animal. Contact
                                        +267 770000212 for more information.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        {fiteredLivestock.map((val) => {
                            return (
                                <div>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardActionArea onClick={() => setOpenDia(true)}>
                                                <CardMedia
                                                    component="img"
                                                    alt="missing livestock"
                                                    height="300"
                                                    image={tow}
                                                    title="missing livestock"
                                                />
                                                <CardContent>
                                                    <Paper className={classes.paper}>
                                                        <h2>Brand: {val.brand}</h2>
                                                        <h2>Kind: {val.kind}</h2>
                                                        <h2>Breed: {val.breed}</h2>
                                                        <h2>Colour: {val.colour}</h2>
                                                        <h2>Age: {val.age}</h2>
                                                        <h2>Weight: {val.weight}</h2>
                                                        <div>
                                                            <Button
                                                                onClick={() => setOpenDia(true)}
                                                                color="primary">
                                                                Claim
                                                            </Button>

                                                        </div>
                                                    </Paper>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                </div>
                            );
                        })}
                    </Grid>

                </Container>
            </main>
        </div>
    );

    async function logout() {
        props.history.push("/");
    }
}

export default withRouter(withStyles(styles)(Dashboard));
