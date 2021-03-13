import { connect } from "react-redux";
import { createUpdateComponentTypeAction, createUpdatePropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";
import DATA_TYPES, { METADATA_TYPES } from "../../../data-model/DataTypes";
import getEnumOptions from "../../../data-model/enumerations";
import BooleanEditor from "../../editors/BooleanEditor";
import EnumValueEditor from "../../editors/EnumValueEditor";
import NumberEditor from "../../editors/NumberEditor";
import StringEditor from "../../editors/StringEditor";
import ComponentTemplateEditor from "./ComponentTemplateEditor";

const editorGenerators = {
    [DATA_TYPES.String]: props => (<StringEditor {...props} />),
    [DATA_TYPES.Number]: props => (<NumberEditor {...props} />),
    [DATA_TYPES.Enum]: props => (<EnumValueEditor {...props} />),
    [DATA_TYPES.Boolean]: props => (<BooleanEditor {...props} />),
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

    // special data type cases
    if (dataType === METADATA_TYPES.ComponentTemplate) {
        return (
            <ComponentTemplateEditor {...props} />
        );
    }

    // if not a special case, try to get an editor generator
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

    // we don't have a clue what to do with this thing lol
    return null;
}

const mapDispatchToProps = (dispatch, { id, table, fieldName }) => ({
    updateMetadata: (newValue) => {
        switch (table) {
            case "propertyTypes": 
                dispatch(createUpdatePropertyTypeAction(id, fieldName, newValue));
                break;
            case "componentTypes":
                dispatch(createUpdateComponentTypeAction(id, fieldName, newValue));
                break;
        }
    }
});

export default connect(null, mapDispatchToProps)(MetadataPropertyEditor);