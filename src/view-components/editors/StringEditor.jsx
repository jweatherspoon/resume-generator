import { connect } from "react-redux";
import { mapPropertyArrayByType } from "../../data-model/Property";

const StringEditor = ({ componentId, allComponents, propertyType }) => {
    const component = allComponents[componentId];
    const mappedProperties = mapPropertyArrayByType(component?.properties);
    const property = mappedProperties[propertyType];
    
    return (
        <input type="text" value={property?.value} placeholder={property?.propertyType} />
    )
}

const mapStateToProps = state => ({
    allComponents: state.components
});

export default connect(mapStateToProps)(StringEditor);