import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";
import { mapPropertyArrayByType } from "../../data-model/Property";

const StringEditor = ({ componentId, allComponents, propertyType, updateProperty }) => {
    const component = allComponents[componentId];
    const mappedProperties = mapPropertyArrayByType(component?.properties);
    const property = mappedProperties[propertyType];

    return (
        <input type="text" value={property && property.value} placeholder={property?.propertyType} onChange={e => updateProperty(e.target.value)} />
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