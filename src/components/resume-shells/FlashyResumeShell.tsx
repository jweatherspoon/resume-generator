import { Grid } from '@material-ui/core'
import IResumeConfigurationProps from '../IResumeConfigurationProps';
import ResumeShellBase from './ResumeShellBase';
import ResumeRegion, { IResumeRegionProps } from './ResumeRegion';
import { ReactNode } from 'react';
import { IResumeComponent } from '../../data-model/ResumeConfiguration';

class FlashyResumeShell extends ResumeShellBase {
    render() : ReactNode {
        return (
            <Grid container>
                <ResumeRegion regionInfo={{
                    id: "sidebar",
                    width: 5,
                    components: this.props.config?.regions.sidebar as IResumeComponent[],
                 }} />

                <ResumeRegion regionInfo={{
                    id: "mainContent",
                    width: 7,
                    components: this.props.config?.regions.mainContent as IResumeComponent[],
                }} />
            </Grid>
        );
    }
}

export default FlashyResumeShell;