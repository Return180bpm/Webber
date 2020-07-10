import React from "react";

import Avatar from "@material-ui/core/Avatar";

export default function ProfilePic(props) {
    // console.log(("### Props of ProfilePic:", props));

    return (
        <Avatar
            width="100"
            height={100}
            onClick={() => props.toggleModal()}
            alt={props.firstname}
            src={props.profilePicUrl}
        />
    );
}
