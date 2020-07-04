import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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

function App() {
    let elem;
    if (location.pathname === "/welcome") {
        // runs if user is NOT logged in
        elem = <Welcome />;
    } else {
        // runs if the user IS logged in
        // elem = <img src="/my-logo.jpg" />;
        elem = (
            <div>
                {" "}
                You are officially logged in! <img src="/main_logo.jpg" />{" "}
            </div>
        );
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {elem}
        </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.querySelector("main"));
