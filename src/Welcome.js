import React from "react";
import { HashRouter, Route } from "react-router-dom";

import * as MUI from "@material-ui/core/";
import Registration from "./Registration";
import Login from "./Login";
import ResetPw from "./ResetPw";
import MyAppBar from "./MyAppBar";

// import Button from "@material-ui/core/Button";
// import Box from "@material-ui/core/Box";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import TypoGraphy from "@material-ui/core/Typography";

const {
    CssBaseline,
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    withStyles,
    createMuiTheme,
    MuiThemeProvider,
} = MUI;

// const styles = (theme) => ({
//     container: {
//         backgroundColor: "blue",
//         color: "red",
//         width: "75%",
//         height: theme.spacing(5),
//     },
// });

// const theme = createMuiTheme({
//     palette: {
//         primary1Color: "#455a64",
//     },
// });

function Welcome(props) {
    const classes = props.classes;

    return (
        // <MuiThemeProvider theme={theme}>
        <HashRouter>
            <div>
                <MyAppBar isLoggedIn={false} />

                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/resetPw" component={ResetPw} />
            </div>
        </HashRouter>
        // </MuiThemeProvider>
    );
}

// export default withStyles(styles)(Welcome);
export default Welcome;
