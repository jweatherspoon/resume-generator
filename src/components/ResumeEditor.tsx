import { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import IResumeConfigurationProps from './IResumeConfigurationProps';
import ResumeConfigEditor from './ResumeConfigEditor';
import ComponentFactory from './ComponentFactory';
// import TestFactory from '../factory/test-factory';
import DataTypes from '../data-model/DataTypes';
import ResumeShell from './resume-shells/ResumeShell';

const ResumeEditor : FunctionComponent<IResumeConfigurationProps> = ({config}) => {
    // only render if we have a valid config object 
    if (!config) {
        return null;
    }

    // const testFactory = new TestFactory();

    return (
        <Grid container>
            {/* the config editor section */}
            <Grid item xs={12} md={8}>
                <ResumeConfigEditor config={config} />
            </Grid>

            {/* the preview section */}
            <Grid item xs={12} md={4}>
                <ResumeShell config={config} />
                {/* 
                    <ResumeShell template={config?.templateId} />
                            ^^^ this guy is vvv
                    <ComponentFactory map={resumeTemplateFactory} objectData={config && {
                            source: {
                                componentId: config.templateId,
                                componentProps: config.properties,
                                children: config.regions,
                                clone: (o) => createComponent(map, o)
                            }
                        }} />

                    So ResumeShell will transform into the correct resume shell template 
                */}

                {/* <ComponentFactory map={testFactory} objectData={{
                    componentId: "test-one",
                    componentProps: [
                        {
                            name: "hello",
                            type: DataTypes.String,
                            value: "hello world :)"
                        },
                        {
                            name: "displayText",
                            type: DataTypes.String,
                            value: "Yo its me ya boi"
                        }
                    ]
                }} /> */}
            </Grid>
        </Grid>
    )
};

export default ResumeEditor;