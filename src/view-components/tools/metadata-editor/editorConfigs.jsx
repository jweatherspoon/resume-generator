import DATA_TYPES from "../../../data-model/DataTypes";
import ENUM_SOURCES from "../../../data-model/enumerations/EnumSources";

const editorConfigs = {
    propertyTypes: {
        controls: [
            
        ],
        editorDefinition: {
            fields: [
                {
                    name: "name",
                    type: DATA_TYPES.String
                },
                {
                    name: "dataType",
                    type: DATA_TYPES.Enum,
                    source: ENUM_SOURCES.DATA_TYPES
                }
            ]
        }
    }
}

export default editorConfigs;