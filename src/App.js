import React from "react";
import axios from "./axios";

import Profile from "./Profile";
import Uploader from "./Uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            profilePicUrl: null,
            bio: null,
            uploaderIsVisible: false,
            err: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then((res) => {
                console.log("response from /user:\n", res);
                if (res.data[0].email) {
                    const {
                        firstname,
                        lastname,
                        email,
                        profile_pic_url: profilePicUrl,
                        bio,
                    } = res.data[0];
                    this.setState({
                        firstname,
                        lastname,
                        email,
                        profilePicUrl,
                        bio,
                    });
                    // this.setState({
                    //     ...res.data[0],
                    // });
                } else {
                    this.setState({
                        err: true,
                    });
                }
            })
            .catch((err) => {
                console.error("Error fetching userdata!\n", err);
            });
    }

    toggleModal() {
        console.log("youre toggling meee!! stop it");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setProfilePicUrl(newProfilePicUrl) {
        this.setState({
            profilePicUrl: newProfilePicUrl,
        });
    }
    setBio(newBio) {
        this.setState({
            profilePic: newBio,
        });
    }

    render() {
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const profilePicUrl = this.state.profilePicUrl;

        return (
            <>
                <Profile
                    firstname={firstname}
                    lastname={lastname}
                    profilePicUrl={profilePicUrl}
                    setBio={this.setBio}
                    toggleModal={this.toggleModal}
                />

                <p onClick={() => this.toggleModal()}> clcicckck </p>
                <Uploader
                    toggle={this.state.uploaderIsVisible}
                    setProfilePicUrl={this.setProfilePicUrl}
                />
                {/* {this.state.uploaderIsVisible && <Uploader />} */}
            </>
        );
    }
}
