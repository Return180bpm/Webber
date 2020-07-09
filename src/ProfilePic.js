import React from "react";

import Avatar from "@material-ui/core/Avatar";

export default function ProfilePic(props) {
    console.log(("### Props of ProfilePic:", props));

    return (
        <Avatar
            width={200}
            height={200}
            onClick={() => props.toggleModal()}
            alt={props.firstname}
            src={props.profilePicUrl}
        />
    );
}
