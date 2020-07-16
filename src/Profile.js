import React from "react";

import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import { profileStyles } from "./styles";

const useStyles = makeStyles(profileStyles);

export default function Profile(props) {
    const classes = useStyles();

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <ProfilePic
                        firstname={props.firstname}
                        lastname={props.lastname}
                        profilePicUrl={props.profilePicUrl}
                        toggleModal={props.toggleModal}
                        myClass={classes.avatar}
                    />
                    <BioEditor bio={props.bio} setBio={props.setBio} />
                </Paper>
            </main>
        </>
    );
}
