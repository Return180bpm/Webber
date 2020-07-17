export default function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        return { ...state, friendships: action.friendships };
    }
    if (action.type == "ACCEPT_FRIEND") {
        let ind;
        let newFriendsArray =
            state.friendships &&
            state.friendships.map((friend, changedInd) => {
                if (friend.id === action.friendId) {
                    friend.accepted = true;
                    ind = changedInd;
                }
                return friend;
            });

        newFriendsArray.splice(0, 0, newFriendsArray.splice(ind, 1)[0]);

        return { ...state, friendships: newFriendsArray };
    }
    if (action.type == "REJECT_FRIEND") {
        let newFriendsArray =
            state.friendships &&
            state.friendships.filter((friend) => {
                if (friend.id === action.friendId) {
                    return;
                }
                return friend;
            });

        return { ...state, friendships: newFriendsArray };
    }
    if (action.type == "ADD_CHAT_MESSAGE") {
        let newChatMessagesArray = action.message;

        return { ...state, chatMessages: newChatMessagesArray };
    }
    return state;
}
