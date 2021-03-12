import { connect } from "react-redux";
import { createUpdatePropertyAction } from "../../data-model/actions/ComponentActions";

import DATA_TYPES from "../../data-model/DataTypes"
import getEnumOptions from "../../data-model/enumerations";
import { mapPropertyArrayByType } from "../../data-model/Property";
import BooleanEditor from "./BooleanEditor";
import EnumValueEditor from "./EnumValueEditor";
import NumberEditor from "./NumberEditor";
import StringEditor from "./StringEditor"

const PropertyDataTypeEditorMap = {
    [DATA_TYPES.String]: (props) => (<StringEditor {...props} />),
    [DATA_TYPES.Enum]: (props) => (<EnumValueEditor {...props} />),
    [DATA_TYPES.Number]: (props) => (<NumberEditor {...props} attributes={{ ...props.attributes, label: props.value }} />),
    [DATA_TYPES.Boolean]: (props) => (<BooleanEditor {...props} />),
}

const PropertyEditorFactory = (props) => {
    const {
        component,
        propertyType,
        updateProperty,
        source,
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
                options: source && getEnumOptions(source),
                ...other
            },
        };

        return editorGenerator(editorProps);
    }

    return null;
}

const mapDispatchToProps = (dispatch, { component, propertyType }) => ({
    updateProperty: (oldValue, newValue) => dispatch(createUpdatePropertyAction(component.componentId, propertyType, newValue)),
})

export default connect(null, mapDispatchToProps)(PropertyEditorFactory);