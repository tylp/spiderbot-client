import { Grid, makeStyles } from "@material-ui/core";
import CustomAppBar from "./components/CustomAppBar";
import ServoControl from "./components/ServoControl";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

function App() {

    const classes = useStyles();

    return (
        <>
            <CustomAppBar />
            <Grid container className={classes.root}>
                <Grid item>
                    <ServoControl />
                </Grid>
            </Grid> 
        </>
    );
}

export default App;
