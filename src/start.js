import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import myTheme from "./theme";

import App from "./App";
import Welcome from "./Welcome";

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
        <ThemeProvider theme={myTheme}>
            <CssBaseline />
            {elem}
        </ThemeProvider>
    );
}

ReactDOM.render(<AppWrapper />, document.querySelector("main"));
