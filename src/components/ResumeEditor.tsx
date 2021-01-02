import { FunctionComponent } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import IResumeConfigurationProps from './IResumeConfigurationProps';
import ResumeConfigEditor from './ResumeConfigEditor';
import ComponentFactory from './ComponentFactory';
// import TestFactory from '../factory/test-factory';
import DataTypes from '../data-model/DataTypes';
import ResumeShell from './resume-shells/ResumeShell';

const useStyles = makeStyles({
    preview: {
        borderLeft: "1px solid black",
    }
});

const ResumeEditor : FunctionComponent<IResumeConfigurationProps> = ({config}) => {
    const classes = useStyles();
    
    // only render if we have a valid config object 
    if (!config) {
        return null;
    }

    // const testFactory = new TestFactory();
    return (
        <Grid container className="fullHeight">
            {/* the config editor section */}
            {/* <Grid item sm={12} md={4}>
                <ResumeConfigEditor config={config} />
            </Grid> */}

            {/* the preview section */}
            <Grid item sm={12} md={8} className={classes.preview}>
                <ResumeShell config={config} />
            </Grid>
        </Grid>
    )
};

export default ResumeEditor;