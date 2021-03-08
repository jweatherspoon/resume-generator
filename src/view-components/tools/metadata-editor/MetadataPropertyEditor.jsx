import { connect } from "react-redux";
import { createUpdatePropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";
import DATA_TYPES from "../../../data-model/DataTypes";
import getEnumOptions from "../../../data-model/enumerations";
import EnumValueEditor from "../../editors/EnumValueEditor";
import NumberEditor from "../../editors/NumberEditor";
import StringEditor from "../../editors/StringEditor";

const editorGenerators = {
    [DATA_TYPES.String]: props => (<StringEditor {...props} />),
    [DATA_TYPES.Number]: props => (<NumberEditor {...props} />),
    [DATA_TYPES.Enum]: props => (<EnumValueEditor {...props} />),
}

const MetadataPropertyEditor = props => {
    const {
        id,
        table,
        source,
        dataType,
        fieldName,
        selectedObject,
        updateMetadata,
        ...other
    } = props;

    const editorGenerator = editorGenerators[dataType];
    if (selectedObject && editorGenerator) {
        // convert to editor model
        const editorProps = {
            value: selectedObject[fieldName],
            onValueChanged: (oldValue, newValue) => updateMetadata(newValue),
            attributes: {
                options: source && getEnumOptions(source),
                ...other
            }
        };
        
        return editorGenerator(editorProps);
    }

    return null;
}

const mapDispatchToProps = (dispatch, { id, table, fieldName }) => ({
    updateMetadata: (newValue) => {
        switch (table) {
            case "propertyTypes": 
                dispatch(createUpdatePropertyTypeAction(id, fieldName, newValue));
                break;
            case "componentTypes":
                alert("TODO: Implement this!");
                break;
            case "componentTemplates":
                alert("TODO: Implement this!");
                break;
        }
    }
});

export default connect(null, mapDispatchToProps)(MetadataPropertyEditor);