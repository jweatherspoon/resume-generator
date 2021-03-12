import { ADD_COMPONENT_TYPE, ADD_PROPERTY_TYPE, UPDATE_COMPONENT_TYPE, UPDATE_PROPERTY_TYPE } from "../../actions/metadata/GlobalMetadataActions";
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

const handleUpdatePropertyType = (state, { id, fieldName, newValue }) => {
    const copiedPropertyType = Object.assign({}, state.propertyTypes[id]);
    copiedPropertyType[fieldName] = newValue;
    return {
        ...state,
        propertyTypes: {
            ...state.propertyTypes,
            [id]: copiedPropertyType
        }
    }
}

const handleAddComponentType = (state, { name }) => {
    return {
        ...state,
        componentTypes: {
            ...state.componentTypes,
            [getUniqueTypeId(Object.keys(state))]: { name }
        }
    }
}

const handleUpdateComponentType = (state, { id, fieldName, newValue }) => {
    const copiedComponentType = Object.assign({}, state.componentTypes[id]);
    copiedComponentType[fieldName] = newValue;
    return {
        ...state,
        componentTypes: {
            ...state.componentTypes,
            [id]: copiedComponentType
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
    [ADD_COMPONENT_TYPE]: handleAddComponentType,
    [UPDATE_PROPERTY_TYPE]: handleUpdatePropertyType,
    [UPDATE_COMPONENT_TYPE]: handleUpdateComponentType,
};

const globalMetadataReducer = createReducer(initialState, reducingActions);
export default globalMetadataReducer;
