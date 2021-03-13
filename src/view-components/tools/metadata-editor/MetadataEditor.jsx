import { Grid, Button, List, ListItem, ListItemText, Divider, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import IconImage from "../../resume-components/IconImage";
import TabbedContentControl from "../../TabbedContentControl";

import ToolWindow from "../ToolWindow";
import editorConfigs from "./editorConfigs";
import MetadataPropertyEditor from "./MetadataPropertyEditor";

const useStyles = makeStyles({
    objectList: {
        border: "1px solid black",
        overflowY: "auto",
    },
    objectListControlsSection: {
        borderBottom: "1px solid black",
        display: 'flex',
        justifyContent: 'flex-end',
    }
});

const tabDefinitions = [
    {
        id: "propertyTypes",
        text: "Property Types",
    },
    {
        id: "componentTypes",
        text: "Component Types",
    },
    {
        id: "componentTemplates",
        text: "Component Templates",
    },
];

const MetadataEditor = ({isOpen, closeDialog, dispatch, globalMetadata}) => {
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(tabDefinitions[0].id);
    const [selectedItem, setSelectedItem] = useState("");

    const buttons = [
        {
            content: "Save Changes",
            action: () => {
                console.log(JSON.stringify(globalMetadata));
                alert("Saved to the console!");
                closeDialog();
            }
        }
    ];

    // configure the currently selected tab content
    const nameKey = selectedTab === "componentTemplates" ? "componentTypes" : selectedTab;
    const getMetadataObjects = key => Object.entries((globalMetadata && globalMetadata[key]) || {});

    const objectList = getMetadataObjects(nameKey).map(([objectType, metadataObject], i) => (
        <ListItem button key={`${metadataObject.name}-${i}`} onClick={() => setSelectedItem(objectType)} selected={objectType === selectedItem}>
            <ListItemText>
                {metadataObject.name}
            </ListItemText>
        </ListItem>
    ));

    const editorConfig = editorConfigs[selectedTab];
    const objectListControls = editorConfig.controls?.map((controlDefinition, i) => (
        <Button key={`object-list-control-${i}`} onClick={() => controlDefinition.action && controlDefinition.action(dispatch)}>
            {controlDefinition.icon && (
                <IconImage icon={controlDefinition.icon} altText={controlDefinition.description} />
            )}
        </Button>
    ));

    const fieldEditors = editorConfig.editorDefinition?.fields?.map((fieldDefinition, i) => {
        const selectedObject = globalMetadata[selectedTab]?.[selectedItem];
        return (
            <ListItem key={`field-${i}`}>
                <MetadataPropertyEditor {...fieldDefinition} id={selectedItem} table={selectedTab}
                    selectedObject={selectedObject} label={fieldDefinition.fieldName} />
            </ListItem>
        );
    });

    return (
        <ToolWindow title="Metadata Editor" closeDialog={closeDialog}
            isOpen={isOpen} buttons={buttons}>
                <TabbedContentControl tabs={tabDefinitions} selectedTab={selectedTab} onSelectedTabChanged={newTab => setSelectedTab(newTab)}>
                    <Grid container>
                        {/* object list */}
                        <Grid item container xs={2} className={classes.objectList}>
                            {/* controls section (e.g. add object) */}
                            {objectListControls && (
                                <Grid item xs={12} className={classes.objectListControlsSection}>
                                    {objectListControls}
                                    <Divider />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <List dense>
                                    {objectList}
                                </List>
                            </Grid>
                        </Grid>

                        {/* editor section */}
                        {selectedItem && (
                            <Grid item container xs={10}>
                                <Grid item xs={12}>
                                    <List>
                                        {fieldEditors}
                                    </List>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </TabbedContentControl>
        </ToolWindow>
    )
}

const mapStateToProps = (state) => ({
    globalMetadata: state.metadata?.global || {}
});

export default connect(mapStateToProps)(MetadataEditor);