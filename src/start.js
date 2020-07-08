import React from "react";
import ReactDOM from "react-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";
import Welcome from "./Welcome";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#37474f",
        },
        secondary: {
            main: "#fff9c4",
        },
    },
});

function AppWrapper() {
    let elem = <Welcome />;
    if (location.pathname === "/welcome") {
        // runs if user is NOT logged in
        elem = <Welcome />;
    } else {
        // runs if the user IS logged in
        // elem = <img src="/my-logo.jpg" />;
        elem = <App />;
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {elem}
        </ThemeProvider>
    );
}

ReactDOM.render(<AppWrapper />, document.querySelector("main"));
