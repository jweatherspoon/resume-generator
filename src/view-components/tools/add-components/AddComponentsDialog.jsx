import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { createAddComponentAction } from "../../../data-model/actions/ComponentActions";
import { createComponentFromTemplate } from "../../../data-model/resume-components/ResumeComponentTemplates";
import RESUME_COMPONENT_TYPES from "../../../data-model/resume-components/ResumeComponentTypes";
import ModalDialog from "../ModalDialog";

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
    const { isOpen, addComponents, closeDialog } = props;
    const [componentsToAdd, setComponentsToAdd] = useState([]);

    const closeAndClearState = (isSave) => {
        if (isSave) {
            addComponents(componentsToAdd);
        }

        setComponentsToAdd([]);
        closeDialog();
    }

    const buttons = [
        {
            content: "Cancel",
            action: () => closeAndClearState(false),
        },
        {
            content: "Save",
            action: () => closeAndClearState(true),
        }
    ]

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
        <ModalDialog title="Add Components" buttons={buttons} closeDialog={() => closeAndClearState(false)} isOpen={isOpen}>
            <Grid container>
                <Grid item xs={6}>
                    {addableComponents}
                </Grid>
                <Grid item xs={6}>
                    {renderedComponentsToAdd}
                </Grid>
            </Grid>
        </ModalDialog>
    );
}

const mapDispatchToProps = (dispatch, { closeDialog }) => ({
    addComponents: (componentsToAdd) => handleAddComponents(componentsToAdd, dispatch),
})

export default connect(null, mapDispatchToProps)(AddComponentsDialog);