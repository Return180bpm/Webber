import axios from "./axios";

export async function getFriends() {
    const { data: friendships } = await axios.get("/getFriends");
    return {
        type: "GET_FRIENDS",
        friendships,
    };
}
export async function acceptFriend(friendId) {
    await axios.post(`/acceptFriendship/${friendId}`);
    return {
        type: "ACCEPT_FRIEND",
        friendId,
    };
}
export async function rejectFriend(friendId) {
    await axios.post(`/rejectFriendship/${friendId}`);
    return {
        type: "REJECT_FRIEND",
        friendId,
    };
}
export function addChatMessage(message) {
    return {
        type: "ADD_CHAT_MESSAGE",
        message,
    };
}
