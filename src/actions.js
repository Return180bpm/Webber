import axios from "./axios";

export async function getFriends() {
    const { data: friendships } = await axios.get("/getFriends");
    console.log("from inside actions/getFriends. Friendships:", friendships);

    return {
        type: "GET_FRIENDS",
        friendships,
    };
}
export async function acceptFriend() {
    const friendships = await axios.get("/friends");
    return {
        type: "ACCEPT",
        userId,
    };
}
export async function rejectFriends() {
    const friendships = await axios.get("/friends");
    return {
        type: "REJECT_FRIENDS",
        userId,
    };
}
