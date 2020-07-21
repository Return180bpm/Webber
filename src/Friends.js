import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getFriends, acceptFriend, rejectFriend } from "./actions.js";
import {
    Typography,
    Avatar,
    Grid,
    Link,
    Paper,
    Container,
    Button,
} from "@material-ui/core/";

const useStyles = makeStyles({
    Root: {
        padding: "1em 1em",
    },
    Avatar: {
        width: "4em",
        height: "4em",
    },
    Grid: {
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        // height: 8,
        padding: "1em 1em",
    },
    Paper: {
        padding: "1em 1em",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    PaperGrid: {
        spacing: 0,
        direction: "column",
        alignItems: "center",
        justify: "center",
    },
    Typo: {
        variant: "h3",
    },
});

const PeopleList = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Grid container className={classes.Grid} spacing={0}>
            {props.peopleArr &&
                props.peopleArr.map((friend) => {
                    return (
                        <Grid item>
                            <Paper className={classes.Paper} key={friend.id}>
                                <Link
                                    to={"/user/" + friend.id}
                                    component={RouterLink}
                                >
                                    {/* <Grid container className={classes.Grid}>
                                        <Grid item> */}
                                    <Avatar
                                        className={classes.Avatar}
                                        src={friend.profile_pic_url}
                                    />
                                    {/* </Grid>
                                        <Grid item> */}
                                    <Typography>
                                        {friend.firstname}
                                        {friend.lastname}
                                    </Typography>
                                </Link>

                                {friend.accepted ? (
                                    <Button
                                        onClick={() => {
                                            dispatch(rejectFriend(friend.id));
                                        }}
                                    >
                                        End Friendship
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    rejectFriend(friend.id)
                                                )
                                            }
                                        >
                                            Decline
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriend(friend.id)
                                                )
                                            }
                                        >
                                            Accept
                                        </Button>
                                    </>
                                )}
                                {/* </Grid>
                                    </Grid> */}
                            </Paper>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

const Friends = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFriends());
    }, []);
    const friendshipsAccepted = useSelector((state) => {
        return (
            state.friendships &&
            state.friendships.filter((friend) => friend.accepted)
        );
    });
    const friendshipsPending = useSelector((state) => {
        return (
            state.friendships &&
            state.friendships.filter((friend) => !friend.accepted)
        );
    });

    return (
        <Container className={classes.Root}>
            <Typography variant="h4" className={classes.Typo}>
                Your Friends
            </Typography>
            <PeopleList peopleArr={friendshipsAccepted} />
            <Typography
                variant="h4"
                className={classes.Typo}
                style={{ marginTop: 16 }}
            >
                Your Friend Requests
            </Typography>
            <PeopleList peopleArr={friendshipsPending} />
        </Container>
    );
};
export default Friends;
