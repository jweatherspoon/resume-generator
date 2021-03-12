import { ICONS } from "../../../data-model/enumerations/IconEnumerationSource"
import DATA_TYPES from "../../../data-model/DataTypes";
import ENUM_SOURCES from "../../../data-model/enumerations/EnumSources";
import { createAddComponentTypeAction, createAddPropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";

const editorConfigs = {
    propertyTypes: {
        controls: [
            {
                icon: ICONS.plus,
                description: "Add Property Type",
                action: dispatch => dispatch(createAddPropertyTypeAction("new component", DATA_TYPES.String))
            }
        ],
        editorDefinition: {
            fields: [
                {
                    fieldName: "name",
                    dataType: DATA_TYPES.String
                },
                {
                    fieldName: "dataType",
                    dataType: DATA_TYPES.Enum,
                    source: ENUM_SOURCES.DataTypes
                }
            ]
        }
    },
    componentTypes: {
        controls: [
            {
                icon: ICONS.plus,
                description: "Add Component Type",
                action: dispatch => dispatch(createAddComponentTypeAction("new Component"))
            }
        ],
        editorDefinition: {
            fields: [
                {
                    fieldName: "name",
                    dataType: DATA_TYPES.String
                },
            ]
        }
    },
    componentTemplates: {
        controls: [],
        editorDefinition: {
            fields: [
                
            ]
        }
    }
}

export default editorConfigs;