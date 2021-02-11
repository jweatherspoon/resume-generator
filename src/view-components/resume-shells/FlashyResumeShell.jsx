import { Grid } from "@material-ui/core"
import ResumeRegion from "./ResumeRegion"

export const flashyResumeRegionInfo = {
    sidebar: {
        width: 5
    },
    mainContent: {
        width: 7
    }
}

const FlashyResumeShell = ({ regionMappedComponents }) => {

    const renderedRegions = Object.entries(flashyResumeRegionInfo).map(([name, info], i) => (
        <ResumeRegion key={i} regionInfo={{
            width: info.width,
            components: regionMappedComponents[name]
        }} />
    ));

    return (
        <Grid container>
            {renderedRegions}
        </Grid>
    );
}

const mapStateToProps = state => ({
    regions: state.activeConfiguration.regions
});

const mapDispatchToProps = (dispatch, { regions }) => ({
    updateRegions: () => dispatch()
})

export default FlashyResumeShell;