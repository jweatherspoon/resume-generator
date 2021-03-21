import { connect } from "react-redux";
import { Divider, Grid, makeStyles } from '@material-ui/core';
import ResumeConfigEditor from './ResumeConfigEditor';
import ResumeShell from "./resume-shells/ResumeShell";

import ApplicationMenu from "./app-menu/ApplicationMenu";
import { useState } from "react";
import AddComponentsDialog from "./tools/add-components/AddComponentsDialog";

import MetadataEditor from "./tools/metadata-editor/MetadataEditor";
import CustomMetadataEditor from "./tools/metadata-editor/CustomMetadataEditor";
import customMetadata from "../data-model/custom-metadata.json";
import { mapObjectArrayByKey } from "../utility/DataUtility";
import AddComponentsFromCustomTemplatesDialog from "./tools/add-components/AddComponentsFromCustomTemplatesDialog";

const useStyles = makeStyles({
    preview: {
        borderLeft: "1px solid black",
        overflow: "auto",
    }
});

const cutoffs = {
    xs: 12,
};

const ResumeBuilder = ({components}) => {
    const classes = useStyles();

    const [dialogStates, setDialogStates] = useState({
        addComponents: false,
        metadataEditor: false,
        addCustomComponents: false,
        customMetadataEditor: false,
    });

    const tryOpenDialog = dialogName => {
        const newDialogStates = Object.assign({}, dialogStates);
        for (let key of Object.keys(newDialogStates)) {
            // sets all keys to false except for the one that matches
            newDialogStates[key] = key === dialogName;
        }

        setDialogStates(newDialogStates);
    }

    // will close all dialogs because none can have empty string as a key
    const closeDialogs = () => tryOpenDialog("");

    const appMenuItemDefinitions = [
        {
            header: "Tools",
            children: [
                {
                    header: "Add Blank Components",
                    action: () => tryOpenDialog("addComponents"),
                },
                {
                    header: "Add Custom Components",
                    action: () => tryOpenDialog("addCustomComponents"),
                },
                {
                    header: "Metadata",
                    children: [
                        {
                            header: "Global Metadata Editor",
                            action: () => tryOpenDialog("metadataEditor"),
                        },
                        {
                            header: "Custom Metadata Editor",
                            action: () => tryOpenDialog("customMetadataEditor"),
                        }
                    ]
                }
            ]
        }
    ];

    // Here, I'm mapping the top level templates by their types, but I'm not updating the children arrays of the top level components but I kinda can't ya feel
    // I somehow need to tell it to pull the correct children from the available templates instead of the type for blank templates... maybe update createFromTemplate call 
    // to check in the componentTemplates for the id if it doesn't find it oh wait that's the issue entirely lol rip. I could add an optional childSelector function? 
    // that createFromTemplate would call on when iterating over its children 
    const customTemplateDefinitions = mapObjectArrayByKey(Object.values(customMetadata.customTemplates), (templateDef) => templateDef.componentType, (templateDef) => templateDef);
    const addComponentsChildTypeSelector = childId => customMetadata.customTemplates[childId]?.componentType;

    return (
        <Grid container className="fullHeight">
            {/* the config editor section */}
            <Grid item {...cutoffs} lg={7}>
                {/* The app menu */}
                <ApplicationMenu menuItemDefinitions={appMenuItemDefinitions} />

                <ResumeConfigEditor components={components}/>
            </Grid>

            {/* the preview section */}
            <Grid item {...cutoffs} lg={5}>
                <ResumeShell />
            </Grid>

            {/* Section for the dialogs */}
            <AddComponentsDialog isOpen={dialogStates.addComponents} closeDialog={closeDialogs} />
            <AddComponentsFromCustomTemplatesDialog isOpen={dialogStates.addCustomComponents} availableTemplates={customMetadata.customTemplates} closeDialog={closeDialogs} />
            <MetadataEditor isOpen={dialogStates.metadataEditor} closeDialog={closeDialogs} />
            <CustomMetadataEditor isOpen={dialogStates.customMetadataEditor} closeDialog={closeDialogs} />
        </Grid>
    )
};

const mapStateToProps = state => ({
    components: state.components
});

export default connect(mapStateToProps)(ResumeBuilder);