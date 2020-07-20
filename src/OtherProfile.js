import React, { useEffect, useState } from "react";
import axios from "./axios";

import FriendButton from "./FriendButton";

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import { profileStyles } from "./styles";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(profileStyles);

export default function OtherProfile(props) {
    const classes = useStyles();

    const userId = props.match.params.id;
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/user/${userId}`);
                if (data.sameId) {
                    return props.history.push("/");
                }

                const {
                    firstname,
                    lastname,
                    email,
                    profile_pic_url: profilePicUrl,
                    bio,
                } = data[0];

                setFirstname(firstname);
                setLastname(firstname);
                setEmail(email);
                setProfilePicUrl(profilePicUrl);
                setBio(bio);
            } catch (error) {
                console.error(
                    "something went wrong while trying to get user info!\n",
                    error
                );
            }
        })();

        // this.props.match.params.id.
    }, []);
    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.upperProfile}>
                        <Box style={{ textAlign: "center" }}>
                            <Avatar
                                src={profilePicUrl}
                                variant="square"
                                className={classes.avatarLarge}
                            />
                            <Box style={{ marginTop: "8px" }}>
                                <FriendButton otherUserId={userId} />
                            </Box>
                        </Box>
                        <Box
                            style={{ marginLeft: 12, height: "100%" }}
                            className={classes.profileInfo}
                        >
                            <Typography
                                variant="h3"
                                className={classes.personName}
                            >
                                {firstname}  {lastname}
                            </Typography>
                            <Box className={classes.bioTextBox}>
                                <Typography
                                    variant="h4"
                                    className={classes.bioText}
                                >
                                    {bio}
                                </Typography>
                            </Box>
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

    // return (
    //     <>
    //         <main className={classes.layout}>
    //             <Paper className={classes.paper}>
    //                 <Avatar src={profilePicUrl} />
    //                 <Typography>
    //                     {firstname} {lastname}
    //                 </Typography>
    //                 {bio}
    //                 <br />
    //                 <FriendButton otherUserId={userId}></FriendButton>

    //                 {firstname === "" && "... looking for user ..."}
    //             </Paper>
    //         </main>
    //     </>
    // );
}
