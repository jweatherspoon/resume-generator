import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { createAddComponentAction } from "../../../data-model/actions/ComponentActions";
import { createComponentFromTemplate } from "../../../data-model/resume-components/ResumeComponentTemplates";
import ModalDialog from "../../dialogs/ModalDialog";

const handleAddComponents = (componentTypesToAdd, createFromTemplate, dispatch) => {
    const dispatchActions = [];
    for (let componentType of componentTypesToAdd) {
        const components = createFromTemplate(componentType);
        dispatchActions.push(...components.map(c => createAddComponentAction(c)));
    }

    for (let action of dispatchActions) {
        dispatch(action);
    }
}

const AddComponentsDialog = (props) => {
    const { 
        isOpen,
        closeDialog, 
        addComponents, 
        propertyTypes,
        componentTypes,
        availableTemplates, 
    } = props;

    const [componentsToAdd, setComponentsToAdd] = useState([]);

    const getComponentName = (componentType) => componentTypes[componentType]?.name;
    const createFromTemplate = (componentType) => createComponentFromTemplate(componentType, propertyTypes, componentTypes, availableTemplates);

    const closeAndClearState = (isSave) => {
        if (isSave) {
            addComponents(componentsToAdd, createFromTemplate);
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
            isDisabled: () => !componentsToAdd?.length
        }
    ]

    const topLevelTemplates = Object.entries(availableTemplates).filter(([componentType, componentTemplate]) => componentTemplate.isTopLevel);
    const topLevelComponentInfo = topLevelTemplates.map(([componentType, componentTemplate]) => ({
        componentType,
        name: getComponentName(componentType),
    }));

    const addableComponents = topLevelComponentInfo.map((info, i) => (
        <Button key={i} fullWidth onClick={() => setComponentsToAdd([...componentsToAdd, info.componentType])}>
            {info.name}
        </Button>
    ))

    const renderedComponentsToAdd = componentsToAdd.map((ct, i) => (
        <Button key={i} fullWidth onClick={() => setComponentsToAdd([...componentsToAdd.slice(0, i), ...componentsToAdd.slice(i + 1)])}>
            {getComponentName(ct)}
        </Button>
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

const mapStateToProps = (state) => ({
    propertyTypes: state.metadata.global.propertyTypes || {},
    componentTypes: state.metadata.global.componentTypes || {},
    availableTemplates: state.metadata.global.componentTemplates || {},
})

const mapDispatchToProps = (dispatch, { addComponents }) => ({
    addComponents: addComponents || ((componentsToAdd, createFromTemplate) => handleAddComponents(componentsToAdd, createFromTemplate, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddComponentsDialog);