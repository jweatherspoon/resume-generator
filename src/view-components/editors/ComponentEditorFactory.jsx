import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import { getRootAndAllChildComponents } from "../../utility/DataUtility";
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
    }
})

const ComponentEditorFactory = ({component, allComponents, maxHeight}) => {
    const classes = useStyles({maxHeight});
    const regionProperty = component.properties.find(p => p.propertyType === PROPERTY_TYPES.Region);

    // return (
    //     <Grid container item className={classes.componentEditor} fullWidth>
    //         <Grid item xs={9} className={classes.topLevelHeader}>
    //             <Typography variant="body1" className={classes.editorHeader}>Properties for {component.name}</Typography>
    //         </Grid>
    //         <Grid item xs={3} className={classes.topLevelHeader}>
    //             <PropertyEditorFactory componentId={component.componentId} allComponents={allComponents} 
    //                 variant="outlined" dense {...regionProperty}  />
    //         </Grid>
    //         <Grid item xs={12} className={classes.gridContainer}>
    //             <TopLevelComponentEditorGrid component={component} allComponents={allComponents} />
    //         </Grid>
    //     </Grid>
    // )

    return (
        <div className={classes.componentEditor}>
            <div className={classes.topLevelHeader}>
                <div className={classes.topLevelComponentHeader}>
                    <Typography variant="body1" className={classes.editorHeader}>Properties for {component.name}</Typography>
                </div>
                <div className={classes.topLevelRegionSelector}>
                    <PropertyEditorFactory componentId={component.componentId} allComponents={allComponents}
                        variant="outlined" dense {...regionProperty} />
                </div>
            </div>

            <div className={classes.gridContainer}>
                <TopLevelComponentEditorGrid component={component} allComponents={allComponents} />
            </div>
        </div>    
    );
}

export default ComponentEditorFactory;