import { connect } from "react-redux";
import { Divider, Grid, makeStyles } from '@material-ui/core';
import ResumeConfigEditor from './ResumeConfigEditor';
import ResumeShell from "./resume-shells/ResumeShell";

import ApplicationMenu from "./app-menu/ApplicationMenu";
import { useState } from "react";
import AddComponentsDialog from "./tools/add-components/AddComponentsDialog";

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

    const [isAddComponentsDialogOpen, setIsAddComponentsDialogOpen] = useState(false);

    const appMenuItemDefinitions = [
        // {
        //     header: "File",
        //     action: () => alert("hi")
        // },
        {
            header: "Tools",
            children: [
                {
                    header: "Add Components",
                    action: () => setIsAddComponentsDialogOpen(true),
                },
                {
                    header: "Metadata Editor",
                    action: () => alert("TODO: Implement this!")
                },
                {
                    header: "Submenu Test",
                    children: [
                        {
                            header: "Submenu Item 1",
                            action: () => alert("I'm numbah one")
                        },
                        {
                            header: "2 man groop",
                            action: () => alert("I'm numbah to0o")
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

            <AddComponentsDialog open={isAddComponentsDialogOpen}
                setOpen={setIsAddComponentsDialogOpen} />
        </Grid>
    )
};

const mapStateToProps = state => ({
    components: state.components
});

export default connect(mapStateToProps)(ResumeBuilder);