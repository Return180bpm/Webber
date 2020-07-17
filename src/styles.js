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

    avatarLarge: {
        width: theme.spacing(25),
        height: theme.spacing(25),
        border: `10px solid ${theme.palette.primary.main}`,

        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

    //   paper: {
    //       // marginTop: theme.spacing(50),
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
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

export const appBarStyles = (theme) => ({
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
});

export const chatStyles = (theme) => ({
    container: {
        padding: "2em 2em",
    },
    paper: {
        // marginTop: theme.spacing(50),
        height: 150,
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
