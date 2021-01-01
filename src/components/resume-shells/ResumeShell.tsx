import { Component } from "react";
import ComponentFactory from "../ComponentFactory";
import IResumeConfigurationProps from "../IResumeConfigurationProps";
import FACTORIES from "../../factory/factory-maps";
import { createComponentWithMapping } from "../../factory";
import { createThemeProperty } from "../../data-model";
import IFactoryEnabledComponentDefinition from "../../factory/IFactoryEnabledComponent";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";

// so the resume shell is meant to display a resume configuration 
class ResumeShell extends Component<{} | IResumeConfigurationProps>  {
    render() {
        const configProps = this.props as IResumeConfigurationProps;
        const componentProps = [
            createThemeProperty(configProps?.config?.componentProps?.find(x => x.name === PROPERTY_TYPES.Theme)?.value)
        ];

        return (
            <div style={{padding: 10}}>
                <ComponentFactory map={FACTORIES.resumeShells}
                    objectData={configProps && {
                        componentId: configProps.config?.templateId,
                        componentProps: componentProps,
                        childrenData: configProps.config?.regions,
                        clone: (o : IFactoryEnabledComponentDefinition) => createComponentWithMapping(FACTORIES.resumeShells, o)
                    }} />
            </div>
        )
    }
};

export default ResumeShell;