import { Grid, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes";
import { sortObjectArrayWithValueSelector } from "../../utility/DataUtility";
import ResumeComponentFactory from "../resume-components/ResumeComponentFactory";

const useStyles = makeStyles({
    scaledComponent: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        transform: props => props?.scaleFactor && `scale(${props.scaleFactor})`,
    }
})

const ResumeRegion = ({ regionInfo: { width, components, background }, allComponents, scaleFactor }) => {
    const classes = useStyles({scaleFactor});

    const sortedComponents = sortObjectArrayWithValueSelector(components, c => c.properties?.find(prop => prop.propertyType === PROPERTY_TYPES.Order)?.value || 0);
    const resumeComponents = sortedComponents?.filter(c => c.isTopLevel).map((c, i) => (
        <div className={classes.scaledComponent} key={`component-${c.name}-${i}`}>
            <ResumeComponentFactory key={i} scaleFactor={scaleFactor} allComponents={allComponents} {...c} />
        </div>
    ));

    return (
        <Grid item xs={width || 12} className="fullHeight" style={{ background }}>
            {resumeComponents}
        </Grid>
    )
}

const mapStateToProps = state => ({
    allComponents: state.components
});

export default connect(mapStateToProps)(ResumeRegion);