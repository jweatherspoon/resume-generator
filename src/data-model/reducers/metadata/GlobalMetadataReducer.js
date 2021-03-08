import { ADD_PROPERTY_TYPE } from "../../actions/metadata/GlobalMetadataActions";
import metadata from "../../metadata.json";
import { createReducer } from "../index";
import { v4 as uuidv4 } from "uuid";

const handleAddPropertyType = (state, { name, dataType }) => {
    return {
        ...state,
        propertyTypes: {
            ...state.propertyTypes,
            [getUniqueTypeId(Object.keys(state))]: { name, dataType }
        }
    }
}

const getUniqueTypeId = (existingTypes) => {
    let typeId = uuidv4();
    while (existingTypes.some(eType => eType === typeId)) {
        typeId = uuidv4();
    }
    
    return typeId;
}

const initialState = metadata;
const reducingActions = {
    [ADD_PROPERTY_TYPE]: handleAddPropertyType,
};

const globalMetadataReducer = createReducer(initialState, reducingActions);
export default globalMetadataReducer;
