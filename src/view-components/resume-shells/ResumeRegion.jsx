import { Grid, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import ResumeComponentFactory from "../resume-components/ResumeComponentFactory";

const useStyles = makeStyles({
    scaledComponent: {
        transform: props => props?.scaleFactor && `scale(${props.scaleFactor})`
    }
})

const ResumeRegion = ({ regionInfo: { width, components }, allComponents, scaleFactor }) => {
    const classes = useStyles({scaleFactor});
    const resumeComponents = components?.filter(c => c.isTopLevel).map((c, i) => (
        <div className={classes.scaledComponent} key={`component-${c.name}-${i}`}>
            <ResumeComponentFactory key={i} scaleFactor={scaleFactor} allComponents={allComponents} {...c} />
        </div>
    ));

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