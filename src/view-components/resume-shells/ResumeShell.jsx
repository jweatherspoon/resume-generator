import { Grid, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes";
import ResumeRegion from "./ResumeRegion";
import getRegionInfo from "./ResumeShellFactory";

const useStyles = makeStyles({
    resumeShell: {
        height: props => props?.height,
        width: props => props?.width,
        float: "right",
        border: "1px solid black",
        fontFamily: props => props?.font && `${props?.font} !important;`,
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

const ResumeShell = ({resumeTemplate, components, pageConfiguration}) => {
    const { height, width, scaleFactor } = getResumeShellDimensions({pageConfiguration});
    const classes = useStyles({ height, width, font: "Raleway" });
    
    // map the top-level components by their regions
    const regionInfos = getRegionInfo(resumeTemplate);
    const regionMappedComponents = mapTopLevelComponentsByRegion(components);
    const renderedRegions = regionInfos && Object.entries(regionInfos).map(([name, info], i) => {
        const regionInfo = Object.assign({}, info);
        regionInfo.components = regionMappedComponents[name];
        return (
            <ResumeRegion key={i} regionInfo={regionInfo} scaleFactor={scaleFactor} />
        );
    });

    return (
        <Grid container className={classes.resumeShell} tag={height / width} id="resume-preview">
            {renderedRegions}
        </Grid>
    );
}

const mapStateToProps = state => ({
    components: state.components,
    theme: state.activeConfiguration.theme,
    resumeTemplate: state.activeConfiguration.activeTemplate,
    pageConfiguration: state.activeConfiguration.pageConfiguration,
});

export default connect(mapStateToProps)(ResumeShell);