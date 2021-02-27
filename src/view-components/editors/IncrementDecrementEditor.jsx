import { Button, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";

const IncrementDecrementEditor = ({ updateProperty, variant, hideLabel, value }) => {
    const label = !hideLabel && value;
    return (
        <div style={{display: "flex"}}>
            <Button onClick={() => updateProperty(value + 1)}>
                <ExpandLess />
            </Button>
            {!hideLabel && (
                <div style={{alignSelf: "center"}}>
                    <Typography variant={variant}>{label}</Typography>
                </div>
            )}
            <Button onClick={() => updateProperty(Math.max(0, value - 1 || 0))}>
                <ExpandMore />
            </Button>
        </div>
    )
}

const mapStateToProps = state => ({
    allComponents: state.components
});

const mapDispatchToProps = (dispatch, { componentId, propertyType }) => ({
    updateProperty: (newValue) => {
        return dispatch(createUpdatePropertyAction(componentId, propertyType, newValue));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(IncrementDecrementEditor);