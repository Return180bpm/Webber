export const profileStyles = (theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    paper: {
        height: 500,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    upperProfile: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    personName: {
        // backgroundColor: theme.palette.primary.dark,
        textAlign: "center",
        padding: "5px 5px",
        // color: "#fff",
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        width: "100%",
    },
    profileInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "350px",
        marginLeft: "8px",
    },

    avatarLarge: {
        width: theme.spacing(30),
        height: theme.spacing(40),
        // border: `1px solid ${theme.palette.primary.dark}`,

        // marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(2),
    },
    friendsBtnAccept: {
        color: theme.palette.primary.light,
    },
    friendsBtnSend: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
    },
    bioTextBox: {
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    bioText: {
        marginTop: "20px",
        // textAlign: "center",
    },
    //   paper: {
    //       // marginTop: theme.spacing(50),
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   },
    //   avatar: {
    //       margin: theme.spacing(1),
    //       backgroundColor: theme.palette.secondary.main,
    //   },
    //   form: {
    //       width: "100%", // Fix IE 11 issue.
    //       marginTop: theme.spacing(3),
    //   },
    //   submit: {
    //       margin: theme.spacing(3, 0, 2),
    //   },
});

export const bioEditor = (theme) => ({
    bioEditorContainer: {
        // width: 100,
        // border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        padding: "8px 18px",

        marginTop: 16,
    },
    textField: {
        minWidth: "100%",
        width: "100%",
        // minHeight: "100%",
    },
});

export const appBarStyles = (theme) => ({
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        height: "50%",
        margin: theme.spacing(1, 1.5),
    },
});

export const chatStyles = (theme) => ({
    chatContainer: {
        padding: "2em 2em",
    },
    singleMsgContainer: {},
    singleMsgInnerContainer: {
        flexDirection: "column",
    },
    paper: {
        // marginTop: theme.spacing(50),
        height: 300,
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export const findPeopleStyles = (theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
});
