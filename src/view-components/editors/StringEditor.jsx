import { Input, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";
import { mapPropertyArrayByType } from "../../data-model/Property";

const StringEditor = ({ componentId, allComponents, propertyType, updateProperty, variant, hideLabel }) => {
    const component = allComponents[componentId];
    const mappedProperties = mapPropertyArrayByType(component?.properties);
    const property = mappedProperties[propertyType];
    const label = !hideLabel && property?.propertyType;
    return (
        <TextField variant={variant} label={label} value={property && property.value}
             placeholder={property?.propertyType} onChange={e => updateProperty(e.target.value)} fullWidth />
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

export default connect(mapStateToProps, mapDispatchToProps)(StringEditor);