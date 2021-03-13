import { connect } from "react-redux";
import { createUpdateComponentTypeAction, createUpdateEnumSourceTopLevelPropertyAction, createUpdatePropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";
import { METADATA_TYPES } from "../../../data-model/DataTypes";
import getEnumOptions from "../../../data-model/enumerations";
import PropertyDataTypeEditorMap from "../../editors/PropertyDataTypeEditorMap";
import ComponentTemplateEditor from "./ComponentTemplateEditor";
import EnumSourceEditor from "./EnumSourceEditor";

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
    else if (dataType === METADATA_TYPES.EnumSource) {
        return (
            <EnumSourceEditor {...props} />
        )
    }

    // if not a special case, try to get an editor generator
    const editorGenerator = PropertyDataTypeEditorMap[dataType];
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
            case "enumSources":
                dispatch(createUpdateEnumSourceTopLevelPropertyAction(id, fieldName, newValue));
                break;
        }
    }
});

export default connect(null, mapDispatchToProps)(MetadataPropertyEditor);