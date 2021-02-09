import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import ResumeComponentFactory from "../resume-components/ResumeComponentFactory";

const ResumeRegion = ({ regionInfo: { width, components }, allComponents }) => {
    const resumeComponents = components?.filter(c => c.isTopLevel).map((c, i) => <ResumeComponentFactory key={i} allComponents={allComponents} {...c} />);
    return (
        <Grid item xs={width || 12} className="fullHeight">
            {resumeComponents}
        </Grid>
    )
}

const mapStateToProps = state => ({
    allComponents: state.components
});

export default connect(mapStateToProps)(ResumeRegion);