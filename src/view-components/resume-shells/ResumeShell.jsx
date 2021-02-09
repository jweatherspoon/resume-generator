import { connect } from "react-redux";
import ResumeShellFactory from "./ResumeShellFactory";

const getRootAndAllChildComponents = (root, allComponents) => {
    const allChildren = [];

    if (root) {
        const stack = [ root ];
        console.log(stack);
        while (stack.length > 0) {
            const node = stack.pop();
            allChildren.push(node);

            // push any children onto the stack to be processed
            if (node.children) {
                for (let childId of node.children) {
                    if (allComponents[childId]) {
                        stack.push(allComponents[childId]);
                    }
                }
            }
        }
    }

    return allChildren;
}

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