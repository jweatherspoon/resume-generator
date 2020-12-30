import { Grid } from '@material-ui/core'
import { Component, ReactNode } from 'react';
import IProperty from '../../data-model/IProperty';
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from '../../factory/IFactoryEnabledComponent';
import IResumeConfigurationProps from '../IResumeConfigurationProps';
import ResumeRegion from './ResumeRegion';
import ResumeShell from './ResumeShell';

class FlashyResumeShell extends Component<{} | IFactoryEnabledComponentProps> implements IFactoryEnabledComponentDefinition {
    componentId: string = "flashy";
    componentProps?: IProperty[] | undefined;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition | ReactNode => {
        return new FlashyResumeShell(objectData);
    }

    render() {
        const configProps = this.props as IFactoryEnabledComponentProps;
        console.log(configProps);
        return (
            <Grid container>
                <ResumeRegion regionInfo={{
                        componentId: "sidebar",
                        width: 5,
                        components: configProps?.source.childrenData.sidebar,
                        clone: this.clone,
                    }} />

                <ResumeRegion regionInfo={{
                        componentId: "mainContent",
                        width: 7,
                        components: configProps?.source.childrenData.mainContent,
                        clone: this.clone,
                    }} />
            </Grid>
        );
    }
}

export default FlashyResumeShell;