import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import customMetadata from "../../../data-model/custom-metadata.json";
import { createComponentFromTemplate } from "../../../data-model/resume-components/ResumeComponentTemplates";
import { sortObjectArrayWithValueSelector } from "../../../utility/DataUtility";
import ToolWindow from "../../dialogs/ToolWindow";
import ResumeConfigEditor from "../../ResumeConfigEditor";
import AddComponentsDialog from "../add-components/AddComponentsDialog";
import { copyPropertyArrayWithUpdate } from "../../../utility/PropertyUtility"
import PROPERTY_TYPES from "../../../data-model/code-gen/PropertyTypes";
import createPropertyOfType from "../../../data-model/Property";

const CustomMetadataEditor = (props) => {
    const { closeDialog, propertyTypes, } = props;

    const [canSave, setCanSave] = useState(false);
    const [isAddComponentsDialogOpen, setIsAddComponentsDialogOpen] = useState(false);
    const [customTemplates, setCustomTemplates] = useState(customMetadata.customTemplates || {});

    const onAddNewCustomTemplates = (templatesToAdd, createFromTemplate) => {
        const copiedCustomTemplates = Object.assign({}, customTemplates);

        const createdComponents = [];
        for (let componentType of templatesToAdd) {
            const components = createFromTemplate(componentType);
            createdComponents.push(...components);
        }

        for (let component of createdComponents) {
            if (!component.properties.find(propertyInfo => propertyInfo.propertyType === PROPERTY_TYPES.TemplateName)) {
                component.properties.push(createPropertyOfType(PROPERTY_TYPES.TemplateName, propertyTypes));
            }

            copiedCustomTemplates[component.componentId] = component;
        }

        setCustomTemplates(copiedCustomTemplates);
        setCanSave(true);
    }

    const updatePropertyOverride = (component, propertyType, oldValue, newValue) => {
        setCanSave(true);
        const template = customTemplates[component.componentId];
        if (template) {
            const copiedProperties = copyPropertyArrayWithUpdate(template.properties, propertyType, newValue);
            const copiedTemplate = Object.assign({}, template);
            copiedTemplate.properties = copiedProperties;

            const copiedCustomTemplates = Object.assign({}, customTemplates);
            copiedCustomTemplates[template.componentId] = copiedTemplate;
            setCustomTemplates(copiedCustomTemplates);
        }
    }

    const buttons = [
        {
            content: "Add New Template",
            action: () => setIsAddComponentsDialogOpen(true)
        },
        {
            content: "Cancel",
            action: closeDialog,
        },
        {
            content: "Save Changes",
            isDisabled: () => !canSave,
            action: () => {
                const copiedCustomMetadata = Object.assign({}, customMetadata || {});
                copiedCustomMetadata.customTemplates = customTemplates;
                console.log(JSON.stringify(copiedCustomMetadata));
                alert("Logged to the console!");
                closeDialog();
            }
        }
    ];

    return (
        <ToolWindow {...props} title="Custom Metadata Editor" buttons={buttons}>
            <Grid item container>
                <Grid item container xs={12}>
                    <ResumeConfigEditor components={customTemplates} updatePropertyOverride={updatePropertyOverride} />
                </Grid>

                <AddComponentsDialog isOpen={isAddComponentsDialogOpen} closeDialog={() => setIsAddComponentsDialogOpen(false)} addComponents={onAddNewCustomTemplates} />
            </Grid>
        </ToolWindow>
    )
}

const mapStateToProps = (state) => ({
    propertyTypes: state?.metadata?.global?.propertyTypes || {},
    componentTypes: state?.metadata?.global?.componentTypes || {},
    enumSources: state?.metadata?.global?.enumSources || {},
})

export default connect(mapStateToProps)(CustomMetadataEditor);