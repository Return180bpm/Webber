import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriends, acceptFriend, rejectFriends } from "./actions.js";

const Friends = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("mounted");

        dispatch(getFriends());
    }, []);
    const friendshipsAccepted = useSelector((state) => {
        console.log("### state.friendship ", state);

        return (
            state.friendships &&
            state.friendships.filter((friend) => friend.accepted)
        );
    });
    // const friendshipsPending = useSelector((state) =>
    //     state.friendships.filter((friend) => !friend.accepted)
    // );

    return (
        <>
            {/* Pending Friend Requests
            {friendshipsPending.map((friend) => {
                return "lol";
            })} */}
        </>
    );
};
export default Friends;
