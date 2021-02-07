import { Divider, Grid, makeStyles } from '@material-ui/core';
import ResumeConfigEditor from './ResumeConfigEditor';

const useStyles = makeStyles({
    preview: {
        border: "1px solid black",
    }
});

const ResumeBuilder = ({config}) => {
    const classes = useStyles();
    
    // only render if we have a valid config object 
    if (!config) {
        return null;
    }

    return (
        <Grid container className="fullHeight">
            {/* the config editor section */}
            <Grid item xs={12} md={7}>
                <ResumeConfigEditor config={config} />
            </Grid>

            {/* the preview section */}
            <Grid item xs={12} md={5} className={classes.preview}>
            </Grid>
        </Grid>
    )
};

export default ResumeBuilder;