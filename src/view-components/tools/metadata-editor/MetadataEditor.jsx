import { Grid, Button, List, ListItem, ListItemText, Divider, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { createAddPropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";
import DATA_TYPES from "../../../data-model/DataTypes";

import ToolWindow from "../ToolWindow";
import editorConfigs from "./editorConfigs";
import MetadataPropertyEditor from "./MetadataPropertyEditor";

const useStyles = makeStyles({
    objectList: {
        border: "1px solid black",
        overflowY: "auto",
    },
    objectListControlsSection: {
        borderBottom: "1px solid black"
    }
})

const MetadataEditor = ({isOpen, closeDialog, globalMetadata, addPropertyType}) => {
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState("propertyTypes");
    const [selectedItem, setSelectedItem] = useState("");

    const buttons = [
        {
            content: "Save Changes",
            action: () => {
                alert("saved!");
                closeDialog();
            }
        }
    ]

    const getMetadataObjects = key => Object.entries((globalMetadata && globalMetadata[key]) || {});

    const objectList = getMetadataObjects(selectedTab).map(([objectType, metadataObject], i) => (
        <ListItem button key={`${metadataObject.name}-${i}`} onClick={() => setSelectedItem(objectType)}>
            <ListItemText>
                {metadataObject.name}
            </ListItemText>
        </ListItem>
    ));

    const editorConfig = editorConfigs[selectedTab];
    const objectListControls = editorConfig.controls?.map((controlDefinition, i) => (
        <Button key={`object-list-control-${i}`} onClick={() => controlDefinition.action && controlDefinition.action()}>
            {controlDefinition.content}
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
                <Grid container>
                    {/* object list */}
                    <Grid item container xs={2} className={classes.objectList}>
                        {/* controls section (e.g. add object) */}
                        <Grid item xs={12} className={classes.objectListControlsSection}>
                            {objectListControls}
                        </Grid>
                        <Divider />
                        <Grid item>
                            <List dense>
                                {objectList}
                            </List>
                        </Grid>
                    </Grid>

                    {/* editor section */}
                    {selectedItem && (
                        <Grid item container xs={10}>
                            <List>
                                {fieldEditors}
                            </List>
                        </Grid>
                    )}
                </Grid>
        </ToolWindow>
    )
}

const mapStateToProps = (state) => ({
    globalMetadata: state.metadata?.global || {}
})

const mapDispatchToProps = (dispatch) => ({
    addPropertyType: () => dispatch(createAddPropertyTypeAction("new property", DATA_TYPES.String)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MetadataEditor);