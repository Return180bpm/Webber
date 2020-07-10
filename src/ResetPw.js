import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";

import { withStyles } from "@material-ui/core/styles";

import HandleForms from "./HandleForms";
import axios from "./axios";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://Codor.com/">
                Codor
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(30),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class ResetPw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            code: null,
            password: null,
            /**@description
             * 0 = default. show: email input
             * 1 = succedd message + verify code form
             */
            currentDisplay: 0,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e, path = null) {
        e.preventDefault();
        const self = this;

        axios
            .post(`/${path}`, self.state)
            .then((res) => {
                console.log("Res from server", res);
                if (res.data.success) {
                    // if (path === "password/reset/start") {
                    this.setState({
                        currentDisplay: this.state.currentDisplay + 1,
                        // email: res.data.email,
                    });
                    // }
                } else {
                    console.log(
                        "###Error### Res.data.success===false \n Something went wrong!\n",
                        err
                    );

                    this.setState({
                        err: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Something went wrong!\n", err);
                this.setState({
                    err: true,
                });
            });
    }
    resetErr() {
        // console.log("heyhye");
        if (this.state.err) {
            this.setState({
                err: false,
            });
        }
    }

    getCurrentDisplay() {
        const { classes } = this.props;
        const formRef = {};

        switch (this.state.currentDisplay) {
            case 0:
                return (
                    <form
                        className={classes.form}
                        noValidate
                        method="POST"
                        onSubmit={(e) =>
                            this.handleSubmit(e, "password/reset/start")
                        }
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    key="email"
                                    name="email"
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    type="email"
                                    variant="outlined"
                                    autoFocus
                                    required
                                    fullWidth
                                    onChange={(e) => this.handleChange(e)}
                                    onFocus={() => this.resetErr()}
                                    inputRef={formRef}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => formRef.current.reportValidity()}
                        >
                            Send Email with Reset Code
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link
                                    to="/"
                                    component={RouterLink}
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Don&apos;t have an account? Sign up!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                );
                break;
            case 1:
                return (
                    <Collapse in={this.state.currentDisplay === 1}>
                        <form
                            className={classes.form}
                            noValidate
                            method="POST"
                            onSubmit={(e) =>
                                this.handleSubmit(e, "password/reset/verify")
                            }
                        >
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                            >
                                {" "}
                                <Grid item xs={12}>
                                    <TextField
                                        key="code"
                                        name="code"
                                        id="code"
                                        // label="Email Address"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={(e) => this.handleChange(e)}
                                        onFocus={() => this.resetErr()}
                                        inputRef={formRef}
                                        inputProps={{
                                            maxLength: 4,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={() => formRef.current.reportValidity()}
                            >
                                Submit Reset Code
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link
                                        to="/"
                                        component={RouterLink}
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Don&apos;t have an account? Sign up!
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Collapse>
                );
                break;
            case 2:
                return (
                    <Collapse in={this.state.currentDisplay > 0}>
                        <form
                            className={classes.form}
                            noValidate
                            method="POST"
                            onSubmit={(e) =>
                                this.handleSubmit(e, "password/reset/update")
                            }
                        >
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                            >
                                {" "}
                                <Grid item xs={12}>
                                    <TextField
                                        key="password"
                                        name="password"
                                        id="password"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={(e) => this.handleChange(e)}
                                        onFocus={() => this.resetErr()}
                                        inputRef={formRef}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={() => formRef.current.reportValidity()}
                            >
                                Reset your password
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link
                                        to="/"
                                        component={RouterLink}
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Don&apos;t have an account? Sign up!
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Collapse>
                );
                break;
            case 3:
                return (
                    <>
                        <Typography component="h1" variant="h6">
                            {" "}
                            You successfully reset your password!{" "}
                        </Typography>

                        <Link
                            to="/login"
                            component={RouterLink}
                            variant="body2"
                            color="textSecondary"
                        >
                            Sign in
                        </Link>
                    </>
                );
        }
    }

    render() {
        const { classes } = this.props;
        const formRef = {};

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    {this.state.err ? (
                        <Typography component="h1" variant="h6">
                            {" "}
                            Something went wrong, please try again{" "}
                        </Typography>
                    ) : (
                        <Typography component="h4" variant="h5">
                            {" "}
                            Reset your password{" "}
                        </Typography>
                    )}

                    {this.getCurrentDisplay()}
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ResetPw);
// export default withStyles(styles, { withTheme: true })(HandleForms(ResetPw));
