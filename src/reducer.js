export default function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        console.log("in GET_FRIENDS");

        return { ...state, friendships: action.friendships };

        // Object.assign({}, ...state, {
        //     friendships: action.friendships,
        // });
    }
    if (action.type == "ACCEPT_FRIEND") {
        const user = { ...state.user, bio: action.bio };
        return { ...state, user };
    }
    if (action.type == "REJECT_FRIEND") {
        const user = { ...state.user, bio: action.bio };
        return { ...state, user };
    }
    return state;
}
