import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";

import getEnumOptions from "../../data-model/enumerations";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PropertyDataTypeEditorMap from "./PropertyDataTypeEditorMap";

const PropertyEditorFactory = (props) => {
    const {
        component,
        propertyType,
        updateProperty,
        source,
        enumSources,
        ...other
    } = props;
    
    const editorGenerator = PropertyDataTypeEditorMap[props.dataType];
    if (editorGenerator) {
        // need to convert props to editor model here and pass those props into the generator
        const propertyMap = mapPropertyArrayByType(component.properties);
        const editorProps = {
            value: propertyMap[propertyType]?.value,
            onValueChanged: updateProperty,
            attributes: {
                label: propertyType,
                options: source && getEnumOptions(source, enumSources),
                ...other
            },
        };

        return editorGenerator(editorProps);
    }

    return null;
}

const mapStateToProps = (state) => ({
    enumSources: state.metadata?.global?.enumSources || []
})

const mapDispatchToProps = (dispatch, { component, propertyType }) => ({
    updateProperty: (oldValue, newValue) => dispatch(createUpdatePropertyAction(component.componentId, propertyType, newValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEditorFactory);