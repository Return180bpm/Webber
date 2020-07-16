import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { profileStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(profileStyles);

export default function ProfilePic(props) {
    const classes = useStyles();
    return (
        <Avatar
            variant="square"
            onClick={() => props.toggleModal()}
            alt={props.firstname}
            src={props.profilePicUrl}
            className={classes.avatarLarge}
        />
    );
}
