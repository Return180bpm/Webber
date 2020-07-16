import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { appBarStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

import ProfilePic from "./ProfilePic";

const useStyles = makeStyles(appBarStyles);

const generateNav = (isLoggedIn) => {
    const classes = useStyles();

    let nav;
    if (!isLoggedIn) {
        nav = (
            <Button
                href="/login"
                // color="primary"
                variant="outlined"
                className={classes.link}
            >
                Login
            </Button>
        );
    } else {
        nav = (
            <Button
                href="/friends"
                // color="primary"
                variant="outlined"
                className={classes.link}
            >
                My Friends
            </Button>
            // <ProfilePic></ProfilePic>
        );
    }
    return nav;
};
const MyAppBar = (props) => {
    const [foo, setFoo] = useState(false);
    const classes = useStyles();

    useEffect(() => {});
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Codor
                </Typography>
                <nav>{generateNav(props.isLoggedIn)}</nav>
            </Toolbar>
        </AppBar>
    );
};
export default MyAppBar;
