import { FunctionComponent } from 'react';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import IResumeConfigurationProps from './IResumeConfigurationProps';
import ResumeConfigEditor from './ResumeConfigEditor';
import ComponentFactory from './factory/ComponentFactory';
// import TestFactory from '../factory/test-factory';
import DataTypes from '../data-model/DataTypes';
import ResumeShell from './resume-shells/ResumeShell';

const useStyles = makeStyles({
    preview: {
        border: "1px solid black",
    }
});

const ResumeEditor = ({config}) => {
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
                <ResumeShell config={config} />
            </Grid>
        </Grid>
    )
};

export default ResumeEditor;