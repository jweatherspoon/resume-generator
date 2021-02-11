import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import { getRootAndAllChildComponents } from "../../utility/DataUtility";
import PropertyEditorFactory from "./PropertyEditorFactory";
import TopLevelComponentEditorGrid from "./TopLevelComponentEditorGrid";

const useStyles = makeStyles({
    componentEditor: {
        border: "1px solid black",
        width: "fit-content",
        padding: 5,
    },

    editorHeader: {
        textDecoration: "underline",
        fontWeight: "bold",
    }
})

const ComponentEditorFactory = ({component, allComponents}) => {
    const classes = useStyles();
    const regionProperty = component.properties.find(p => p.propertyType === PROPERTY_TYPES.Region);

    return (
        <Grid container item className={classes.componentEditor}>
            <Grid item xs={9}>
                <Typography variant="body1" className={classes.editorHeader}>Properties for {component.name}</Typography>
            </Grid>
            <Grid item xs={3}>
                <PropertyEditorFactory componentId={component.componentId} allComponents={allComponents} {...regionProperty}  />
            </Grid>

            <TopLevelComponentEditorGrid component={component} allComponents={allComponents} />
        </Grid>
    )
}

export default ComponentEditorFactory;