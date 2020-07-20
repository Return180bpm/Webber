import React from "react";

import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import { profileStyles } from "./styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(profileStyles);

export default function Profile(props) {
    const classes = useStyles();

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} className={classes.upperProfile}>
                            <ProfilePic
                                firstname={props.firstname}
                                lastname={props.lastname}
                                profilePicUrl={props.profilePicUrl}
                                toggleModal={props.toggleModal}
                                myClass={classes.avatar}
                            />
                            <BioEditor bio={props.bio} setBio={props.setBio} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Something something feed
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </>
    );
}
