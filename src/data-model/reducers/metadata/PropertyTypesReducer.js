import { ADD_PROPERTY_TYPE, UPDATE_PROPERTY_TYPE } from "../../actions/metadata/GlobalMetadataActions";
import metadata from "../../metadata.json";
import { createReducer } from "../index";
import { getUniqueTypeId } from "./utilities";

/**
 * Handle adding a new property type to the redux store
 * @param {object} state - The current property types state
 * @param {{name: string, dataType: DATA_TYPES}} payload - The action payload
 * @returns The next state
 */
const handleAddPropertyType = (state, { name, dataType }) => {
    return {
        ...state,
        [getUniqueTypeId(Object.keys(state))]: { name, dataType }
    }
}

/**
 * Handle updating an existing property type in metadata
 * @param {object} state - The current property types state
 * @param {{id: string, fieldName: string, newValue: any}} payload - The action payload
 * @returns The next state
 */
const handleUpdatePropertyType = (state, { id, fieldName, newValue }) => {
    const copiedPropertyType = Object.assign({}, state[id]);
    copiedPropertyType[fieldName] = newValue;
    return {
        ...state,
        [id]: copiedPropertyType
    }
}

// pull the initial state from the metadata file and configure our reducing actions
const initialState = metadata.propertyTypes;
const reducingActions = {
    [ADD_PROPERTY_TYPE]: handleAddPropertyType,
    [UPDATE_PROPERTY_TYPE]: handleUpdatePropertyType,
};

const propertyTypesReducer = createReducer(initialState, reducingActions);
export default propertyTypesReducer;
