import React from "react";
import axios from "./axios";

import Button from "@material-ui/core/Button";
import { Typography, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import Profile from "./Profile";
import Uploader from "./Uploader";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioDraft: "",
            hasEdited: false,
            bioEditorIsVisible: false,
            err: false,
        };
    }

    handleChange(e) {
        this.setState({
            hasEdited: true,
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit() {
        // if (this.state.hasEdited && this.props.bio !== this.state.bioDraft) {
        this.props.setBio(this.state.bioDraft);
        this.toggleBioEditor();
        // }
    }

    toggleBioEditor() {
        this.setState({
            bioEditorIsVisible: !this.state.bioEditorIsVisible,
        });
    }

    getBioView() {
        if (!this.props.bio) {
            return (
                <Button
                    onClick={() => {
                        this.toggleBioEditor();
                    }}
                >
                    Add Bio
                </Button>
            );
        } else {
            return (
                <>
                    <Typography>{this.props.bio}</Typography>
                    <Button
                        onClick={() => {
                            this.toggleBioEditor();
                        }}
                    >
                        Edit Bio
                    </Button>
                </>
            );
        }
    }

    render() {
        return (
            <>
                {this.state.bioEditorIsVisible ? (
                    <>
                        <TextField
                            placeholder="I'm a great person"
                            value={this.state.bioDraft || this.props.bio}
                            name="bioDraft"
                            multiline
                            rows={2}
                            rowsMax={4}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Button onClick={() => this.toggleBioEditor()}>
                            Cancel
                        </Button>

                        <Button
                            onClick={() => this.handleSubmit()}
                            {...(this.state.hasEdited &&
                            this.props.bio !== this.state.bioDraft
                                ? {}
                                : { disabled: true })}
                        >
                            Save Bio
                        </Button>

                        {/* {this.state.hasEdited &&
                        this.props.bio !== this.state.bioDraft ? (
                            <Button onClick={() => this.handleSubmit()}>
                                Save Bio
                            </Button>
                        ) : (
                            <Button
                                onClick={() => this.handleSubmit()}
                                disabled
                            >
                                Save Bio
                            </Button>
                        )} */}
                    </>
                ) : (
                    this.getBioView()
                )}
            </>
        );
    }
}
