import * as io from "socket.io-client";

// import { chatMessages, chatMessage } from "./actions";
import { getAllChatMessages, addChatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) =>
            store.dispatch(getAllChatMessages(msgs))
        );

        socket.on("chatMessage", (msg) => store.dispatch(addChatMessage(msg)));
    }
};
