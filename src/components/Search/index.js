import React, {useEffect, useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import SearchDialog from "../SearchDialog";

const useStyles = makeStyles((theme) => ({
    root: {
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
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const [brand, setBrand] = useState("");

    const [lost_livestock, setLost_livestock] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/api/lost_livestock").then((response) => {
            setLost_livestock(response.data);
        });
    }, []);

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search your brand..."
                inputProps={{'aria-label': 'search'}}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onSearch()}
                        onSubmit={SearchDialog()}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );

    function onSearch() {
        <SearchDialog/>
    }
}

