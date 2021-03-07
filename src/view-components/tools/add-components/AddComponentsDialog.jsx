import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { createAddComponentAction } from "../../../data-model/actions/ComponentActions";
import { createComponentFromTemplate } from "../../../data-model/resume-components/ResumeComponentTemplates";
import RESUME_COMPONENT_TYPES from "../../../data-model/resume-components/ResumeComponentTypes";

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

const onClose = ({ reason, componentsToAdd, dispatch, setOpen, setComponentsToAdd }) => {
    if (reason === "") {
        handleAddComponents(componentsToAdd, dispatch);
    }

    setComponentsToAdd && setComponentsToAdd([]);
    setOpen && setOpen(false);
}

const getComponentName = (componentType, filterTopLevel = false) => {
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

    const { open, setOpen, addComponents } = props;
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

    const closeDialog = () => onClose({ setComponentsToAdd, setOpen });

    return (
        <Dialog open={open} onClose={e => onClose({ e, ...props })}
            onBackdropClick={() => closeDialog()} maxWidth='md' fullWidth>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={9} style={{margin: 'auto'}}>
                        <Typography>
                            <strong>
                                Add Components
                            </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={3} className="dialog-button-container">
                        <Button variant="outlined" className="dialog-button"
                            onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button variant="outlined" className="dialog-button"
                            onClick={() => addComponents(componentsToAdd, setComponentsToAdd)}>
                            Save
                        </Button>
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

const mapDispatchToProps = (dispatch, { open, setOpen }) => ({
    addComponents: (componentsToAdd, setComponentsToAdd) => onClose({ reason: "", componentsToAdd, setComponentsToAdd, dispatch, open, setOpen })
})

export default connect(null, mapDispatchToProps)(AddComponentsDialog);