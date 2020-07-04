import React from "react";
import axios from "axios";

// Material UI stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

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
        marginTop: theme.spacing(50),
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

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this;
        axios
            .post("/register", self.state)
            .then((res) => {
                console.log("Res from server", res);
                location.replace("/");
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
                    <Typography component="h1" variant="h5">
                        {this.state.err
                            ? "Something went wrong, please try again"
                            : "Sign up"}
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        method="POST"
                        action="/register"
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    autoComplete="fname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    onChange={(e) => this.handleChange(e)}
                                    onFocus={() => this.resetErr()}
                                    inputRef={formRef}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lastName"
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="lname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    onChange={(e) => this.handleChange(e)}
                                    onFocus={() => this.resetErr()}
                                    inputRef={formRef}
                                />
                            </Grid>
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
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    id="password"
                                    label="Password"
                                    autoComplete="current-password"
                                    type="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    onChange={(e) => this.handleChange(e)}
                                    onFocus={() => this.resetErr()}
                                    inputRef={formRef}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => formRef.current.reportValidity()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Already have an account? Sign in
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

export default withStyles(styles, { withTheme: true })(Registration);
