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
        backgroundColor: theme.palette.primary.dark,
        textAlign: "center",
        padding: "5px 5px",
        color: "#fff",
        width: "100%",
    },
    profileInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    avatarLarge: {
        width: theme.spacing(30),
        height: theme.spacing(40),
        border: `1px solid ${theme.palette.primary.dark}`,

        // marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(2),
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
        height: "100%",
    },
    textField: {
        border: {},
        width: "100%",
    },
});

export const appBarStyles = (theme) => ({
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
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
