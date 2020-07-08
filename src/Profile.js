import React from "react";

import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile(props) {
    return (
        <>
            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                profilePicUrl={props.profilePicUrl}
                toggleModal={props.toggleModal}
            />
            <BioEditor />
        </>
    );
}
