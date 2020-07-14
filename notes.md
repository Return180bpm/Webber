registration
login
reset password

-   what's on your mind tonight?

edit profile / see my profile
see users profile
group chat

## navigation:

    * friend
    * my profile
    * (login)
    * chat

# welcome

-   slide transition from "Sign up" to "Something went wrong and back"
-   repeat password
-   error handling

# login

-   how do you set cookie after logging in?

# my_profile

    * profile pic
        * click to change
    * firstname, lastname, (username), age, location...
    * bio
        * click to edit
    * tech stack
    * feed

### redux

    * start.js:
        ** <Provider.js>
    * reducer.js:
        ** reduce(state, actionType): if(actionType === "SOME_ACTION_TYPE") {...}
    * myActions.js:
        ** what is being dispatched: axios... return {TYPE: "ACTION_NAME", id}
    * MY_COMPONENT.js:
        ** useSelector
        ** dispatch = useDispatch(), import { action } from myActions.js, onClick={dispatch(myAction(id))}

###

    * if (rows.length === 0) {
        render makeFriendshipRequest
    }
    * if (rows.accepted === true) {
        render cancelFriendship
    }
    * if (rows.accepted === false) {

        if(rows.sender === userId) {
            render cancelFriendship
        }
        render acceptFriendship + cancelFriendship;
    }
