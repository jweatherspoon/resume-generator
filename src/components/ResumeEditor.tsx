import { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import IResumeConfigurationProps from './IResumeConfigurationProps';

const ResumeEditor : FunctionComponent<IResumeConfigurationProps> = ({config}) => {
    // only render if we have a valid config object 
    if (!config) {
        return null;
    }

    return (
        <Grid container>
            {/* the config editor section */}
            <Grid item xs={12} md={8}>
                <ResumeConfigEditor config={config} />
            </Grid>

            {/* the preview section */}
            <Grid item xs={12} md={4}>

            </Grid>
        </Grid>
    )
};

export default ResumeEditor;