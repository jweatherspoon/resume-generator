import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";

import ENUM_SOURCES, { getEnumOptions } from "../../data-model/code-gen/EnumSources";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PropertyDataTypeEditorMap from "./PropertyDataTypeEditorMap";

const PropertyEditorFactory = (props) => {
    const {
        name,
        component,
        propertyType,
        propertyTypes,
        updateProperty,
        source,
        enumSources,
        ...other
    } = props;

    const enumSourceId = propertyTypes[propertyType]?.source || source;
    
    const editorGenerator = PropertyDataTypeEditorMap[props.dataType];
    if (editorGenerator) {
        // need to convert props to editor model here and pass those props into the generator
        const propertyMap = mapPropertyArrayByType(component.properties);
        const editorProps = {
            value: propertyMap[propertyType]?.value,
            onValueChanged: updateProperty,
            attributes: {
                label: name,
                options: enumSourceId && getEnumOptions(enumSourceId, enumSources),
                isColorDisplay: enumSourceId === ENUM_SOURCES.Colors,
                ...other
            },
        };

        return editorGenerator(editorProps);
    }

    return null;
}

const mapStateToProps = (state) => ({
    enumSources: state.metadata?.global?.enumSources || [],
    propertyTypes: state.metadata?.global?.propertyTypes || []
})

const mapDispatchToProps = (dispatch, { component, propertyType }) => ({
    updateProperty: (oldValue, newValue) => dispatch(createUpdatePropertyAction(component.componentId, propertyType, newValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEditorFactory);