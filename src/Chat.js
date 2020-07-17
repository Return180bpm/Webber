import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

import {
    TextField,
    Container,
    Grid,
    Typography,
    Paper,
    Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { chatStyles } from "./styles";

const useStyles = makeStyles(chatStyles);

const keyCheck = (e) => {
    // document.getElementById("chatBox").value = "";

    if (e.key === "Enter") {
        socket.emit("chatMessage", e.target.value);
    }
};

const Message = (props) => {
    const classes = useStyles();

    const msg = props.myMsg;

    // console.log("props in <message>", props);

    return (
        <Grid container spacing={2} className={classes.singleMsgContainer}>
            <Grid item>
                <Avatar variant="square" src={msg.profile_pic_url} />
                {/* // <Paper className={classes.paper}>// </Paper> */}
            </Grid>
            <Grid item>
                <Grid container className={classes.singleMsgInnerContainer}>
                    <Grid item>
                        <Typography
                            component="span"
                            variant="h6"
                            display="inline"
                        >
                            {msg.firstname}{" "}
                        </Typography>
                        <Typography display="inline">
                            {msg.created_at}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{msg.message_text}</Typography>
                    </Grid>
                </Grid>
                {/* // <Paper className={classes.paper}>// </Paper> */}
            </Grid>
        </Grid>
    );
};

const Chat = () => {
    const classes = useStyles();
    const elemRef = useRef();
    const chatMessages = useSelector((state) => {
        return state && state.chatMessages;
    });

    useEffect(() => {
        // run this every time you get a new chat message
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    return (
        // <Container component="main" maxWidth="xs">
        <Grid
            component="main"
            container
            spacing={2}
            className={classes.chatContainer}
        >
            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper} ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((msgObj) => (
                            <Message key={msgObj.id} myMsg={msgObj} />
                        ))}
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
