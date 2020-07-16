import React from "react";
import axios from "./axios";

import MyAppBar from "./MyAppBar";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import Uploader from "./Uploader";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import { BrowserRouter, Route } from "react-router-dom";

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
        this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then((res) => {
                // console.log("response from /user:\n", res);
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
        axios
            .post("/updateBio", { bio: newBio })
            .then(() => {
                this.setState({
                    bio: newBio,
                });
            })
            .catch((err) => {
                console.error("Error while updating bio!\n", err);
            });
    }

    render() {
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const profilePicUrl = this.state.profilePicUrl;
        const bio = this.state.bio;

        return (
            <>
                <MyAppBar isLoggedIn={true} />

                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstname={firstname}
                                    lastname={lastname}
                                    profilePicUrl={profilePicUrl}
                                    bio={bio}
                                    setBio={this.setBio}
                                    toggleModal={this.toggleModal}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/findPeople"
                            render={(props) => (
                                <FindPeople key={props.match.url} />
                            )}
                        />
                        <Route
                            path="/friends"
                            render={(props) => (
                                <Friends key={props.match.url} />
                            )}
                        />
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        toggle={this.state.uploaderIsVisible}
                        setProfilePicUrl={this.setProfilePicUrl}
                    />
                )}
            </>
        );
    }
}
