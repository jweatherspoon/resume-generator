import { Grid, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import ResumeRegion from "./ResumeRegion";
import ResumeShellFactory, { ResumeShellMap } from "./ResumeShellFactory";

const useStyles = makeStyles({
    resumeShell: {
        height: props => props?.height,
        width: props => props?.width,
        // fontSize: props => `${(props?.scaleFactor && 12 * props.scaleFactor) || 5}pt`
    },
})

const mapTopLevelComponentsByRegion = (components) => {
    const regionMappedComponents = {};
    const topLevelComponents = Object.values(components).filter(c => c.isTopLevel);
    for (let component of topLevelComponents) {
        const propertyMap = mapPropertyArrayByType(component.properties);
        const region = propertyMap[PROPERTY_TYPES.Region]?.value;
        if (region) {
            if (!regionMappedComponents[region]) {
                regionMappedComponents[region] = [];
            }

            // push the top level component and all of its children into the region 
            const topLevelComponentAndChildren = [component];
            // const topLevelComponentAndChildren = getRootAndAllChildComponents(component, components);
            regionMappedComponents[region].push(...topLevelComponentAndChildren);
        }
    }

    return regionMappedComponents;
}

const getResumeShellDimensions = ({ pageConfiguration: { length, width }}) => {
    const pageConfigLengthToWidthRatio = length / (width || 1);
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const dimensions = {
        height: screenHeight,
        width: screenWidth,
        scaleFactor: 1 / pageConfigLengthToWidthRatio,
    }

    if (screenHeight > screenWidth) {
        // take up 100% width and determine height by page config ratio 
        dimensions.height = dimensions.width * pageConfigLengthToWidthRatio;
    } else {
        dimensions.width = dimensions.height / pageConfigLengthToWidthRatio;
    }

    return dimensions;
}

const ResumeShell = ({theme, resumeTemplate, components, pageConfiguration}) => {
    const { height, width, scaleFactor } = getResumeShellDimensions({pageConfiguration});
    const classes = useStyles({ height, width });
    
    // map the top-level components by their regions
    const regionInfo = ResumeShellMap[resumeTemplate];
    const regionMappedComponents = mapTopLevelComponentsByRegion(components);
    const renderedRegions = regionInfo && Object.entries(regionInfo).map(([name, info], i) => (
        <ResumeRegion key={i} regionInfo={{
            width: info.width,
            components: regionMappedComponents[name]
        }} scaleFactor={scaleFactor} />
    ));

    return (
        <Grid container className={classes.resumeShell}>
            {renderedRegions}
        </Grid>
    )

    return <ResumeShellFactory template={resumeTemplate} regionMappedComponents={regionMappedComponents} />;
}

const mapStateToProps = state => ({
    components: state.components,
    theme: state.activeConfiguration.theme,
    resumeTemplate: state.activeConfiguration.activeTemplate,
    pageConfiguration: state.activeConfiguration.pageConfiguration,
});

export default connect(mapStateToProps)(ResumeShell);