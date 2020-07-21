import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Link,
} from "@material-ui/core";
import { appBarStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

import ProfilePic from "./ProfilePic";

const useStyles = makeStyles(appBarStyles);

const generateNav = (isLoggedIn, profilePicUrl) => {
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
            <>
                <Button
                    href="/chat"
                    // color="primary"
                    variant="outlined"
                    className={classes.link}
                >
                    Chat
                </Button>
                <Button
                    href="/findPeople"
                    // color="primary"
                    variant="outlined"
                    className={classes.link}
                >
                    Find people
                </Button>
                <Button
                    href="/friends"
                    // color="primary"
                    variant="outlined"
                    className={classes.link}
                >
                    My Friends
                </Button>
                <Link to="/" component={RouterLink}>
                    <Avatar
                        src={profilePicUrl}
                        style={{ width: 100, height: 100 }}
                    />
                </Link>
            </>
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
                    variant="h3"
                    style={{ color: "white" }}
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Codor
                </Typography>
                <nav
                    style={{
                        width: 500,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    {generateNav(props.isLoggedIn, props.profilePicUrl)}
                </nav>
            </Toolbar>
        </AppBar>
    );
};
export default MyAppBar;
