import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

import HandleForms from "./HandleForms";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://nightowls.com/">
                Nightowls
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
            /**@description
             * 0 = default. show: email input
             * 1 = succedd message
             */
            currentDisplay: 0,
        };
    }
    getCurrentDisplay() {
        const { classes } = this.props;
        const formRef = {};

        switch (this.state.currentDisplay) {
            case 0:
                console.log("jojojo Resetpw", this.state.currentDisplay);

                return (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {this.state.err
                                    ? "Something went wrong, please try again"
                                    : "Reset your password"}
                            </Typography>
                            <form
                                className={classes.form}
                                noValidate
                                method="POST"
                                action="/register"
                                onSubmit={(e) =>
                                    this.handleSubmit(e, "password/reset/start")
                                }
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="email"
                                            id="email"
                                            label="Email Address"
                                            autoComplete="email"
                                            type="email"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            onChange={(e) =>
                                                this.handleChange(e)
                                            }
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
                                    onClick={() =>
                                        formRef.current.reportValidity()
                                    }
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
                        </div>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </Container>
                );
                break;
        }
    }

    render() {
        const { classes } = this.props;
        const formRef = {};

        return <>{this.getCurrentDisplay()}</>;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {this.state.err
                            ? "Something went wrong, please try again"
                            : "Reset your password"}
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        method="POST"
                        action="/register"
                        onSubmit={(e) => this.handleSubmit(e, "login")}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    type="email"
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
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

// export default Login;
export default withStyles(styles, { withTheme: true })(HandleForms(ResetPw));
