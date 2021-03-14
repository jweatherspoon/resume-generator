import ICONS from "../../../data-model/code-gen/enumerations/Icons"
import DATA_TYPES, { METADATA_TYPES } from "../../../data-model/DataTypes";
import ENUM_SOURCES from "../../../data-model/code-gen/EnumSources";
import { createAddComponentTypeAction, createAddEnumSourceAction, createAddPropertyTypeAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";

const editorConfigs = {
    propertyTypes: {
        controls: [
            {
                icon: ICONS.plus,
                description: "Add Property Type",
                action: dispatch => dispatch(createAddPropertyTypeAction("_newProperty", DATA_TYPES.String))
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
                },
                {
                    fieldName: "isList",
                    dataType: DATA_TYPES.Boolean,
                }
            ]
        }
    },
    componentTypes: {
        controls: [
            {
                icon: ICONS.plus,
                description: "Add Component Type",
                action: dispatch => dispatch(createAddComponentTypeAction("_newComponent"))
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
        editorDefinition: {
            fields: [
                {
                    fieldName: "template",
                    dataType: METADATA_TYPES.ComponentTemplate
                }
            ]
        }
    },
    enumSources: {
        controls: [
            {
                icon: ICONS.plus,
                description: "Add Enum Source",
                action: dispatch => dispatch(createAddEnumSourceAction("_newEnumSource", false))
            }
        ],
        editorDefinition: {
            fields: [
                {
                    fieldName: "enumSource",
                    dataType: METADATA_TYPES.EnumSource
                }
                // {
                //     fieldName: "name",
                //     dataType: DATA_TYPES.String
                // },
                // {
                //     fieldName: "isStatic",
                //     dataType: DATA_TYPES.Boolean,
                // },
            ]
        }
    }
}

export default editorConfigs;