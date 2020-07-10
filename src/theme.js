import { createMuiTheme } from "@material-ui/core/styles";
import { green, yellow } from "@material-ui/core/colors";

const myTheme = createMuiTheme({
    palette: {
        primary: green,

        secondary: yellow,
    },
});

export default myTheme;
