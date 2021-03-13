import DATA_TYPES from "../../data-model/DataTypes";
import BooleanEditor from "./BooleanEditor";
import EnumValueEditor from "./EnumValueEditor";
import NumberEditor from "./NumberEditor";
import StringEditor from "./StringEditor";

const PropertyDataTypeEditorMap = {
    [DATA_TYPES.String]: (props) => (<StringEditor {...props} />),
    [DATA_TYPES.Enum]: (props) => (<EnumValueEditor {...props} />),
    [DATA_TYPES.Number]: (props) => (<NumberEditor {...props} attributes={{ ...props.attributes, label: props.value }} />),
    [DATA_TYPES.Boolean]: (props) => (<BooleanEditor {...props} />),
}

export default PropertyDataTypeEditorMap;