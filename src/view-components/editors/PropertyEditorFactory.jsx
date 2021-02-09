import DATA_TYPES from "../../data-model/DataTypes"
import StringEditor from "./StringEditor"

const PropertyDataTypeEditorMap = {
    [DATA_TYPES.String]: (props) => (<StringEditor {...props} />),
}

const PropertyEditorFactory = (props) => {
    const editorGenerator = PropertyDataTypeEditorMap[props.dataType];
    if (editorGenerator) {
        return editorGenerator(props);
    }

    return null;
}

export default PropertyEditorFactory;