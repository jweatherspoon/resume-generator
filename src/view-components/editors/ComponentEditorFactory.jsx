import { makeStyles, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes";
import PropertyEditorFactory from "./PropertyEditorFactory";
import TopLevelComponentEditorGrid from "./TopLevelComponentEditorGrid";

const defaultMaxHeight = 225;
const topLevelHeaderHeight = 50;
const useStyles = makeStyles({
    componentEditor: {
        border: "1px solid black",
        padding: 5,
        maxHeight: props => props?.maxHeight || defaultMaxHeight,
        width: "100%",
        overflow: "hidden"
    },
    topLevelHeader: {
        display: "flex",
        borderBottom: "1px solid black",
        flexWrap: "nowrap",
        width: "100%",
        height: topLevelHeaderHeight,
    },
    editorHeader: {
        textDecoration: "underline",
        fontWeight: "bold",
    },
    gridContainer: {
        overflowY: "auto",
        maxHeight: props => props?.maxHeight || (defaultMaxHeight - topLevelHeaderHeight),
    },
    topLevelComponentHeader: {
        flex: 1,
    },
    topLevelRegionSelector: {
        flex: 0.2
    },
    topLevelOrderSelector: {
        display: "flex",
    },
})

const ComponentEditorFactory = ({component, allComponents, maxHeight, updatePropertyOverride}) => {
    const classes = useStyles({maxHeight});
    const propertyMap = mapPropertyArrayByType(component.properties);
    const regionProperty = propertyMap[PROPERTY_TYPES.Region];
    const orderProperty = propertyMap[PROPERTY_TYPES.Order];

    const orderSelector = (regionProperty?.value && orderProperty !== null) && (
        <PropertyEditorFactory component={component} {...orderProperty} isIncrementDecrement />
    );

    return (
        <div className={classes.componentEditor}>
            <div className={classes.topLevelHeader}>
                <div className={classes.topLevelComponentHeader}>
                    <Typography variant="body1" className={classes.editorHeader}>Properties for {component.name}</Typography>
                </div>
                <div className={classes.topLevelOrderSelector}>
                    {orderSelector}
                    <div className={classes.topLevelRegionSelector}>
                        <PropertyEditorFactory {...regionProperty} component={component} variant="outlined" isDense />
                    </div>
                </div>
            </div>

            <div className={classes.gridContainer}>
                <TopLevelComponentEditorGrid component={component} allComponents={allComponents} updatePropertyOverride={updatePropertyOverride} />
            </div>
        </div>    
    );
}

export default ComponentEditorFactory;