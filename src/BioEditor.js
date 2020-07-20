import React from "react";
import axios from "./axios";

import Button from "@material-ui/core/Button";
import { Typography, Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { bioEditor } from "./styles";
const useStyles = makeStyles(bioEditor);

import Profile from "./Profile";
import Uploader from "./Uploader";

export default class BioEditor extends React.Component {
    const classes = useStyles();
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
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {this.props.bio}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                this.toggleBioEditor();
                            }}
                        >
                            Edit Bio
                        </Button>
                    </Grid>
                </Grid>
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
