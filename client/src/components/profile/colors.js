import { makeStyles } from '@material-ui/core/styles';
import {deepPurple, deepOrange, blue, red, purple, cyan, green, amber} from '@material-ui/core/colors'

export default makeStyles((theme) => ({
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    red_white: {
        primary: {
            main: blue,
        },
        secondary: {
            main: red,
        }
    },
    purple_white: {
        primary: {
            main: blue,
        },
        secondary: {
            main: purple,
        }
    },
    deep_purple_white: {
        primary: {
            main: blue,
        },
        secondary: {
            main: deepPurple,
        }
    },
    cyan_black: {
        primary: {
            main: blue,
        },
        secondary: {
            main: cyan,
        }
    },
    green_blue: {
        primary: {
            main: blue,
        },
        secondary: {
            main: green,
        }
    },
    gold_black: {
        primary: {
            main: blue,
        },
        secondary: {
            main: amber,
        }
    },
}));