import { ICONS } from "../../../data-model/enumerations/IconEnumerationSource"
import DATA_TYPES from "../../../data-model/DataTypes";
import ENUM_SOURCES from "../../../data-model/enumerations/EnumSources";
import { createAddPropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";

const editorConfigs = {
    propertyTypes: {
        controls: [
            {
                icon: ICONS.plus,
                description: "Add Property Type",
                action: dispatch => dispatch(createAddPropertyTypeAction("new property", DATA_TYPES.String))
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
    componentTemplates: {
        controls: [],
        editorDefinition: {
            fields: [
                
            ]
        }
    }
}

export default editorConfigs;