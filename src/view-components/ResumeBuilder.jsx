import { connect } from "react-redux";
import { Divider, Grid, makeStyles } from '@material-ui/core';
import ResumeConfigEditor from './ResumeConfigEditor';
import ResumeShell from "./resume-shells/ResumeShell";
import AddComponentDialog from "./dialogs/AddComponentDialog";
import { useState } from "react";
import { O_APPEND } from "constants";

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
    const [open, setOpen] = useState(true);

    return (
        <Grid container className="fullHeight">
            {/* the config editor section */}
            <Grid item {...cutoffs}>
                <Grid item xs={12}>
                    <AddComponentDialog {...{ open, setOpen }} />
                </Grid>
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