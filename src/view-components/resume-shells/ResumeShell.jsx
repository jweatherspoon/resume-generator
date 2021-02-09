import { connect } from "react-redux";
import ResumeShellFactory from "./ResumeShellFactory";

const ResumeShell = ({theme, resumeTemplate, components}) => {
    // map the top-level components by their regions
    const regionMappedComponents = {};
    const topLevelComponents = Object.values(components).filter(c => c.isTopLevel);
    for (let component of topLevelComponents) {
        if (component.region) {
            if (!regionMappedComponents[component.region]) {
                regionMappedComponents[component.region] = [];
            }

            // push the top level component and all of its children into the region 
            const topLevelComponentAndChildren = [ component ];
            // const topLevelComponentAndChildren = getRootAndAllChildComponents(component, components);
            regionMappedComponents[component.region].push(...topLevelComponentAndChildren);
        }
    }

    return <ResumeShellFactory template={resumeTemplate} regionMappedComponents={regionMappedComponents} />;
}

const mapStateToProps = state => ({
    theme: state.activeConfiguration.theme,
    resumeTemplate: state.activeConfiguration.activeTemplate,
    components: state.components
});

export default connect(mapStateToProps)(ResumeShell);