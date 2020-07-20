import React, { useEffect, useState } from "react";
import axios from "./axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "./styles";
const useStyles = makeStyles(profileStyles);

const FriendButton = (props) => {
    const classes = useStyles();
    const [buttonText, setButtonText] = useState("");
    const buttonTextList = [
        "Send Friend Request",
        "End Friendship",
        "Cancel Friend Request",
        "Reject Friend Request",
        "Accept Friend Request",
    ];

    const handleClick = () => {
        switch (buttonText) {
            case buttonTextList[0]: {
                axios
                    .post(`/makeFriendshipRequest/${props.otherUserId}`)
                    .then(({ data }) => {
                        // console.log("###data after send friend request", data);
                        setButtonText(buttonTextList[2]);
                    })
                    .catch((err) => {
                        console.error(
                            "Something went wrong while getting friendship status",
                            err
                        );
                    });
            }
            case buttonTextList[1]:
            case buttonTextList[2]:
            case buttonTextList[3]: {
                axios
                    .post(`/rejectFriendship/${props.otherUserId}`) // change this to rejectFriendship
                    .then(({ data }) => {
                        // console.log("###data after send friend request", data);
                        setButtonText(buttonTextList[0]);
                    })
                    .catch((err) => {
                        console.error(
                            "Something went wrong while getting friendship status",
                            err
                        );
                    });
            }
        }
    };

    const handleAccept = async () => {
        try {
            await axios.post(`/acceptFriendship/${props.otherUserId}`);
            setButtonText(buttonTextList[1]);
        } catch (error) {
            console.error(
                "Something went wrong while accepting friend request",
                error
            );
        }
    };

    useEffect(() => {
        axios
            .get("/friendshipStatus", {
                params: { otherUserId: props.otherUserId },
            })
            .then(({ data }) => {
                console.log("###data ####", data);

                if (data.length === 0) {
                    setButtonText(buttonTextList[0]);
                } else {
                    if (data[0].accepted) {
                        setButtonText(buttonTextList[1]);
                    } else {
                        if (
                            parseInt(props.otherUserId, 10) ===
                            data[0].recipient_id
                        ) {
                            // logged in user sent the friend request
                            setButtonText(buttonTextList[2]);
                        } else {
                            setButtonText(buttonTextList[3]);
                        }
                    }
                }
            })
            .catch((err) => {
                console.error(
                    "Something went wrong while getting friendship status",
                    err
                );
            });
    }, []);

    return (
        <>
            {buttonText === buttonTextList[3] && (
                <Button
                    className={classes.friendsBtnAccept}
                    variant="contained"
                    onClick={handleAccept}
                >
                    {" "}
                    {buttonTextList[4]}
                </Button>
            )}
            <Button
                className={
                    buttonText === buttonTextList[0]
                        ? classes.friendsBtnSend
                        : ""
                }
                variant="contained"
                onClick={handleClick}
            >
                {buttonText ? buttonText : "Loading..."}
            </Button>
        </>
    );
};
export default FriendButton;
