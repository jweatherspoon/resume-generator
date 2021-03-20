import { connect } from "react-redux";
import { Button, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { createAddComponentTemplateAction, createAddTemplatedChildAction, createAddTemplatedPropertyAction, createRemoveTemplatedChildAction, createRemoveTemplatedPropertyAction, createUpdateTopLevelPropertyAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";
import BooleanEditor from "../../editors/BooleanEditor";
import ModalDialog from "../../dialogs/ModalDialog";
import { useState } from "react";
import FAIcon from "../../resume-components/FAIcon";
import { sortObjectArrayByKey } from "../../../utility/DataUtility";
import ICONS from "../../../data-model/code-gen/enumerations/Icons";

/**
 * Renders a templated value list
 * @param {object} props - The component props
 * @returns A list for displaying templated value names
 */
const TemplatedValueList = (props) => {
    const {
        ids,
        header,
        getName,
        isDense,
        addAction,
        deleteAction,
        addableOptions,
    } = props;

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const listItems = ids.map((id, index) => {
        const itemName = getName(id);
        return (
            <ListItem button key={`${itemName}-${index}`} onClick={() => deleteAction(id)}>
                <ListItemText>
                    {itemName}
                </ListItemText>
            </ListItem>
        )
    });

    const closeDialog = () => {
        setSelectedItem("");
        setIsAddDialogOpen(false);
    }

    const buttons = [
        {
            content: "Save",
            isDisabled: () => !selectedItem,
            action: () => {
                if (selectedItem && addAction) {
                    addAction(selectedItem);
                }

                closeDialog();
            },
        }
    ];

    const openAddDialogButton = addableOptions && (
        <Button onClick={() => setIsAddDialogOpen(true)} fullWidth variant="contained">
            <FAIcon icon={ICONS.plus} altText="Add New" />
        </Button>
    );

    const sortedOptions = addableOptions && sortObjectArrayByKey(addableOptions, (option) => getName(option));
    const addDialogOptions = sortedOptions?.map((option, index) => (
        <ListItem button key={`addable-option-${index}`} onClick={() => setSelectedItem(option)} selected={option === selectedItem}>
            <ListItemText>
                {getName(option)}
            </ListItemText>
        </ListItem>
    ))
    
    return (
        <Grid item container xs={12}>
            <Grid item container xs={12}>
                <Grid item xs={11}>
                    <Typography variant="h6">
                        {header}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    {openAddDialogButton}
                </Grid>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <List dense={isDense}>
                    {listItems}
                </List>
            </Grid>
            <ModalDialog title="Add New" buttons={buttons} isOpen={isAddDialogOpen}
                closeDialog={closeDialog} maxWidth="sm">
                    <List dense={isDense}>
                        {addDialogOptions}
                    </List>
            </ModalDialog>
        </Grid>
    );
}

/**
 * Render a component template editor
 * @param {object} props - The component props
 * @returns A component template editor
 */
const ComponentTemplateEditor = (props) => {
    const {
        id,
        selectedObject,
        enumSources,
        propertyTypes,
        componentTypes,
        componentTemplates,
        addDefaultChild,
        addDefaultProperty,
        removeDefaultChild,
        removeDefaultProperty,
        addComponentTemplate,
        updateTopLevelProperty,
        ...other
    } = props;

    // used to get component and property type names for display 
    const getNameFromId = id => componentTypes[id]?.name || propertyTypes[id]?.name || enumSources[id]?.name || `type ${id}`;
    const componentName = getNameFromId(id);

    // if a template does not exist for the given type, give the option to create one 
    if (!selectedObject) {
        if (componentTypes[id]) {
            // this is a component type, we can add a template for it
            return (
                <Container>
                    <Typography variant="h6">
                        No template found for {componentName}. Click the button below to add one.
                    </Typography>
                    <Button onClick={() => addComponentTemplate()} variant="outlined">
                        Add Component Template
                    </Button>
                </Container>
            )
        }
        else {
            // this is likely a property type, we cannot add a template for it
            return (
                <Container>
                    <Typography variant="h6">
                        {componentName} is not a valid component type. Select a component type from the object list to add / edit component templates.
                    </Typography>
                </Container>
            )
        }
    }

    const handleIsTopLevelChanged = newValue => {
        updateTopLevelProperty("isTopLevel", newValue);

        // add / remove the order and region properties depending on the value
        const properties = Object.entries(propertyTypes).map(([propertyType, typeDefinition]) => ({
            ...typeDefinition,
            propertyType,
        }));
        
        const orderProperty = properties.find(p => p.name === "Order");
        const regionProperty = properties.find(p => p.name === "Region");
        if (newValue) {
            addDefaultProperty(orderProperty.propertyType);
            addDefaultProperty(regionProperty.propertyType);
        } 
        else {
            removeDefaultProperty(orderProperty.propertyType);
            removeDefaultProperty(regionProperty.propertyType);
        }
    }

    return (
        <Grid container>
            {/* top level properties */}
            <Grid item xs={12}>
                <BooleanEditor value={selectedObject.isTopLevel || false} onValueChanged={(oldValue, newValue) => handleIsTopLevelChanged(newValue)} 
                    attributes={{
                        label: "Is Top Level",
                    }} />
            </Grid>

            {/* default property / child types */}
            <TemplatedValueList isDense header="Default Properties" addableOptions={Object.keys(propertyTypes)} ids={selectedObject.properties} getName={getNameFromId} addAction={ptype => addDefaultProperty(ptype)} deleteAction={ptype => removeDefaultProperty(ptype)} />
            <TemplatedValueList isDense header="Default Children" addableOptions={Object.keys(componentTypes)} ids={selectedObject.children} getName={getNameFromId} addAction={ctype => addDefaultChild(ctype)} deleteAction={ctype => removeDefaultChild(ctype)} />
        </Grid>
    );
}

const mapStateToProps = state => ({
    enumSources: state.metadata.global.enumSources,
    propertyTypes: state.metadata.global.propertyTypes,
    componentTypes: state.metadata.global.componentTypes,
    componentTemplates: state.metadata.global.componentTemplates
});

const mapDispatchToProps = (dispatch, { id }) => ({
    addComponentTemplate: () => dispatch(createAddComponentTemplateAction(id, false)),
    updateTopLevelProperty: (fieldName, newValue) => dispatch(createUpdateTopLevelPropertyAction(id, fieldName, newValue)),
    addDefaultProperty: (propertyType) => dispatch(createAddTemplatedPropertyAction(id, propertyType)),
    addDefaultChild: (childType) => dispatch(createAddTemplatedChildAction(id, childType)),
    removeDefaultProperty: (propertyType) => dispatch(createRemoveTemplatedPropertyAction(id, propertyType)),
    removeDefaultChild: (childType) => dispatch(createRemoveTemplatedChildAction(id, childType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentTemplateEditor);