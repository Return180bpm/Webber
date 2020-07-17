import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

import {
    TextField,
    Container,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { chatStyles } from "./styles";

const useStyles = makeStyles(chatStyles);

const keyCheck = (e) => {
    if (e.key === "Enter") {
        socket.emit("chatMessage", e.target.value);
    }
};

const Chat = () => {
    const classes = useStyles();
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);

    useEffect(() => {
        // run this every time you get a new chat message
        console.log("elementRef: ", elemRef);
        console.log("scrollTop: ", elemRef.current.scrollTop);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        console.log("scrollHeight: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);
    return (
        // <Container component="main" maxWidth="xs">
        <Grid
            component="main"
            container
            spacing={2}
            className={classes.container}
        >
            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper} ref={elemRef}>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>Chat messages yo</Typography>
                    <Typography>LASSSSSST</Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
                <TextField
                    name="chatBox"
                    id="chatBox"
                    label="chat box"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    onKeyDown={keyCheck}
                    // onChange={(e) => this.handleChange(e)}
                />
            </Grid>
        </Grid>
        //{" "}
        // </Container>
    );
};

export default Chat;
