import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { createAddComponentAction } from "../../data-model/actions/ComponentActions";
import { createComponentFromTemplate } from "../../data-model/resume-components/ResumeComponentTemplates";
import RESUME_COMPONENT_TYPES from "../../data-model/resume-components/ResumeComponentTypes";

const handleAddComponents = (componentsToAdd, dispatch) => {
    const dispatchActions = [];
    for (let componentType of componentsToAdd) {
        const components = createComponentFromTemplate(componentType);
        dispatchActions.push(...components.map(c => createAddComponentAction(c)));
    }

    for (let action of dispatchActions) {
        dispatch(action);
    }
}

const onClose = ({event, reason, addComponents, componentsToAdd, dispatch, }) => {
    if (reason === "") {
        handleAddComponents(componentsToAdd, dispatch);
    }
}

const getComponentName = (componentType, filterTopLevel=false) => {
    const components = createComponentFromTemplate(componentType);
    if (components && components.length > 0) {
        const component = components[0];
        if (!filterTopLevel || component.isTopLevel) {
            return component.name;
        }
    }

    return componentType;
}

const AddComponentsDialog = (props) => {
    const [componentsToAdd, setComponentsToAdd] = useState([]);

    const { open, addComponents, setOpen } = props;
    const componentTypes = Object.values(RESUME_COMPONENT_TYPES);
    const topLevelComponentInfo = componentTypes.map((componentType, i) => ({
        componentType, 
        components: createComponentFromTemplate(componentType) || [],
    })).filter(componentInfo => componentInfo.components[0]?.isTopLevel)
       .map(componentInfo => ({
           componentType: componentInfo.componentType,
           component: componentInfo.components[0],
       }));

    const addableComponents = topLevelComponentInfo.map((info, i) => (
        <Button key={i} fullWidth onClick={() => setComponentsToAdd([...componentsToAdd, info.componentType])}>{info.component?.name}</Button>
    ))

    const renderedComponentsToAdd = componentsToAdd.map((ct, i) => (
        <Button key={i} fullWidth onClick={() => setComponentsToAdd([...componentsToAdd.slice(0, i), ...componentsToAdd.slice(i + 1)])}>{getComponentName(ct)}</Button>
    ));

    return (
        <Dialog open={open} onClose={e => onClose({e, ...props})}>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={9}>
                        <Typography>Add Component</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={() => {
                            addComponents(componentsToAdd);
                            setComponentsToAdd([]);
                            setOpen(false); 
                        }}>Save</Button>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={6}>
                        {addableComponents}
                    </Grid>
                    <Grid item xs={6}>
                        {renderedComponentsToAdd}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>   
    )
}

const mapDispatchToProps = (dispatch) => ({
    addComponents: (componentsToAdd) => onClose({ reason: "", componentsToAdd, dispatch})
})

export default connect(null, mapDispatchToProps)(AddComponentsDialog);