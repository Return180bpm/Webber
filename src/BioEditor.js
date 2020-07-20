import React, { useState } from "react";
import axios from "./axios";

import Button from "@material-ui/core/Button";
import { Typography, Container, Grid, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { bioEditor } from "./styles";
const useStyles = makeStyles(bioEditor);

import Profile from "./Profile";
import Uploader from "./Uploader";

export default function BioEditor(props) {
    const classes = useStyles();

    const [bioDraft, setBioDraft] = useState("");
    const [hasEdited, setHasEdited] = useState(false);
    const [bioEditorIsVisible, setBioEditorIsVisible] = useState(false);
    const [err, setErr] = useState(false);

    const handleChange = (e) => {
        setHasEdited(true);
        setBioDraft(e.target.value);
    };

    const handleSubmit = () => {
        // if (this.state.hasEdited && this.props.bio !== this.state.bioDraft) {
        props.setBio(bioDraft);
        toggleBioEditor();
        // }
    };

    const toggleBioEditor = () => {
        setBioEditorIsVisible(!bioEditorIsVisible);
    };

    const getBioView = () => {
        if (!props.bio) {
            return (
                <Button
                    onClick={() => {
                        toggleBioEditor();
                    }}
                >
                    Add Bio
                </Button>
            );
        } else {
            return (
                <Box display="flex" className={classes.bioEditorContainer}>
                    <Typography variant="h6">{props.bio}</Typography>

                    <Button
                        variant="outlined"
                        style={{ alignSelf: "flex-end" }}
                        onClick={() => {
                            toggleBioEditor();
                        }}
                    >
                        Edit Bio
                    </Button>
                </Box>

                // <Grid container>
                //     <Grid item xs={12}>
                //         <Typography variant="body1">{props.bio}</Typography>
                //     </Grid>
                //     <Grid item xs={12}>
                //         <Button
                //             variant="outlined"
                //             onClick={() => {
                //                 toggleBioEditor();
                //             }}
                //         >
                //             Edit Bio
                //         </Button>
                //     </Grid>
                // </Grid>
            );
        }
    };

    return (
        <>
            {bioEditorIsVisible ? (
                <Box display="flex" className={classes.bioEditorContainer}>
                    <TextField
                        variant="filled"
                        placeholder="I'm a great person"
                        value={bioDraft || props.bio}
                        name="bioDraft"
                        multiline
                        rows={4}
                        rowsMax={4}
                        className={classes.textField}
                        onChange={(e) => handleChange(e)}
                    />
                    <Box
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button onClick={() => toggleBioEditor()}>
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit()}
                            {...(hasEdited && props.bio !== bioDraft
                                ? {}
                                : { disabled: true })}
                        >
                            Save Bio
                        </Button>
                    </Box>
                </Box>
            ) : (
                getBioView()
            )}
        </>
    );
}
