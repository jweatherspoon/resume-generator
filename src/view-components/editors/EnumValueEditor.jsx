import { MenuItem, Select, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";
import getEnumOptions from "../../data-model/enumerations";
import { mapPropertyArrayByType } from "../../data-model/Property";

const EnumValueEditor = ({ componentId, allComponents, propertyType, updateProperty, variant, hideLabel }) => {
    const component = allComponents[componentId];
    const mappedProperties = mapPropertyArrayByType(component?.properties);
    const property = mappedProperties[propertyType];
    
    const enumOptions = getEnumOptions(property?.source);
    const menuItems = enumOptions.map((o, i) => (
        <MenuItem key={i} value={o}>
            {o}
        </MenuItem>
    ))

    const label = !hideLabel && property?.propertyType;

    return (
        <TextField select fullWidth value={property?.value || ""} label={label} variant={variant}
            onChange={(e, c) => updateProperty(c?.props?.children || "")}>
            {menuItems}
        </TextField>
    )
}

const mapStateToProps = state => ({
    allComponents: state.components
});

const mapDispatchToProps = (dispatch, { componentId, propertyType }) => ({
    updateProperty: (newValue) => {
        console.log(newValue);
        return dispatch(createUpdatePropertyAction(componentId, propertyType, newValue));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EnumValueEditor);