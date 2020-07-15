import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import myTheme from "./theme";

import App from "./App";
import Welcome from "./Welcome";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

function AppWrapper() {
    let elem = <Welcome />;
    if (location.pathname === "/welcome") {
        // runs if user is NOT logged in
        elem = <Welcome />;
    } else {
        // runs if the user IS logged in
        // elem = <img src="/my-logo.jpg" />;
        // <Provider store={store}>
        //     elem = (
        //     <App />
        //     );
        // </Provider>;
        elem = (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
    return (
        <ThemeProvider theme={myTheme}>
            <CssBaseline />
            {elem}
        </ThemeProvider>
    );
}

ReactDOM.render(<AppWrapper />, document.querySelector("main"));
