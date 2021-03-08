import { connect } from "react-redux";
import { Divider, Grid, makeStyles } from '@material-ui/core';
import ResumeConfigEditor from './ResumeConfigEditor';
import ResumeShell from "./resume-shells/ResumeShell";

import ApplicationMenu from "./app-menu/ApplicationMenu";
import { useState } from "react";
import AddComponentsDialog from "./tools/add-components/AddComponentsDialog";
import MetadataEditor from "./tools/metadata-editor/MetadataEditor";

const useStyles = makeStyles({
    preview: {
        borderLeft: "1px solid black",
        overflow: "auto",
    }
});

const cutoffs = {
    xs: 12,
    lg: 6
};

const ResumeBuilder = ({components}) => {
    const classes = useStyles();

    const [dialogStates, setDialogStates] = useState({
        addComponents: false,
        metadataEditor: false
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
                    header: "Add Components",
                    action: () => tryOpenDialog("addComponents"),
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
                            action: () => alert("TODO: Implement this!")
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <Grid container className="fullHeight">
            {/* the config editor section */}
            <Grid item {...cutoffs}>
                {/* The app menu */}
                <ApplicationMenu menuItemDefinitions={appMenuItemDefinitions} />

                <ResumeConfigEditor components={components}/>
            </Grid>

            {/* the preview section */}
            <Grid item {...cutoffs} className={classes.preview}>
                <ResumeShell />
            </Grid>

            {/* Section for the dialogs */}
            <AddComponentsDialog isOpen={dialogStates.addComponents} closeDialog={closeDialogs} />
            <MetadataEditor isOpen={dialogStates.metadataEditor} closeDialog={closeDialogs} />
        </Grid>
    )
};

const mapStateToProps = state => ({
    components: state.components
});

export default connect(mapStateToProps)(ResumeBuilder);