import React from "react";

import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import BioEditor from "./BioEditor";

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import { profileStyles } from "./styles";
import { Typography, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles(profileStyles);

export default function Profile(props) {
    const classes = useStyles();

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} style={{ height: "300px" }}>
                    <Grid item xs={12} className={classes.upperProfile}>
                        <Box
                        // style={{
                        //     display: "flex",
                        //     justifyContent: "flex-end",
                        // }}
                        >
                            <ProfilePic
                                firstname={props.firstname}
                                lastname={props.lastname}
                                profilePicUrl={props.profilePicUrl}
                                toggleModal={props.toggleModal}
                                myClass={classes.avatar}
                            />
                            <Uploader
                                // toggle={this.state.uploaderIsVisible}
                                setProfilePicUrl={props.setProfilePicUrl}
                            />
                        </Box>

                        <Box className={classes.profileInfo}>
                            <Typography
                                variant="h5"
                                className={classes.personName}
                            >
                                {props.firstname}  {props.lastname}
                            </Typography>

                            <BioEditor bio={props.bio} setBio={props.setBio} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Something something feed
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    );
}
