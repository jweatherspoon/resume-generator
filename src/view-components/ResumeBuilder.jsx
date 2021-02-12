import { connect } from "react-redux";
import { Divider, Grid, makeStyles } from '@material-ui/core';
import ResumeConfigEditor from './ResumeConfigEditor';
import ResumeShell from "./resume-shells/ResumeShell";

const useStyles = makeStyles({
    preview: {
        border: "1px solid black",
        overflow: "auto",
    }
});

const cutoffs = {
    xs: 12,
    lg: 6
};

const ResumeBuilder = ({components}) => {
    const classes = useStyles();

    return (
        <Grid container className="fullHeight">
            {/* the config editor section */}
            <Grid item {...cutoffs}>
                <ResumeConfigEditor components={components}/>
            </Grid>

            {/* the preview section */}
            <Grid item {...cutoffs} className={classes.preview}>
                <ResumeShell />
            </Grid>
        </Grid>
    )
};

const mapStateToProps = state => ({
    components: state.components
});

export default connect(mapStateToProps)(ResumeBuilder);