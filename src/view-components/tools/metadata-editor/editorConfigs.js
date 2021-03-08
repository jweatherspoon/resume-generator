import DATA_TYPES from "../../../data-model/DataTypes";
import ENUM_SOURCES from "../../../data-model/enumerations/EnumSources";

const editorConfigs = {
    propertyTypes: {
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