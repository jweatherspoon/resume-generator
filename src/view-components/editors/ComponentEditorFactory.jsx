import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
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

const getPropertyEditorsForComponentAndChildren = (rootComponent, allComponents) => {
    const propertyEditors = [];
    const componentAndChildren = getRootAndAllChildComponents(rootComponent, allComponents);
    for (let component of componentAndChildren) {
        if (component.properties) {
            propertyEditors.push(...component.properties.map((p, i) => (
                <Grid item container key={i} xs={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={11}>
                        <PropertyEditorFactory componentId={component.componentId} {...p} />
                    </Grid>
                </Grid>
            )));
        }   
    }

    return propertyEditors;
}

const ComponentEditorFactory = ({component, allComponents}) => {
    const classes = useStyles();

    const propertyEditors = getPropertyEditorsForComponentAndChildren(component, allComponents);

    return (
        <Grid container item className={classes.componentEditor}>
            <Grid item xs={12}>
                <Typography variant="body" className={classes.editorHeader}>Properties for {component.name}</Typography>
            </Grid>

            {propertyEditors}
        </Grid>
    )
}

export default ComponentEditorFactory;