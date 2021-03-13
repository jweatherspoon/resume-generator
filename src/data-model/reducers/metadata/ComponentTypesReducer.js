import { ADD_COMPONENT_TYPE, UPDATE_COMPONENT_TYPE } from "../../actions/metadata/GlobalMetadataActions";
import metadata from "../../metadata.json";
import { createReducer } from "../index";
import { getUniqueTypeId } from "./utilities";

/**
 * Handle adding a new component type to the redux store
 * @param {object} state - The current component types state
 * @param {{name: string}} payload - The action payload
 * @returns The next state
 */
const handleAddComponentType = (state, { name }) => {
    return {
        ...state,
        [getUniqueTypeId(Object.keys(state))]: { name }
    }
}

/**
 * Handle updating an existing component type in metadata
 * @param {object} state - The current component types state
 * @param {{id: string, fieldName: string, newValue: any}} payload - The action payload
 * @returns The next state
 */
const handleUpdateComponentType = (state, { id, fieldName, newValue }) => {
    const copiedComponentType = Object.assign({}, state[id]);
    copiedComponentType[fieldName] = newValue;
    return {
        ...state,
        [id]: copiedComponentType
    }
}

// pull initial state from metadata component types and configure our reducing actions
const initialState = metadata.componentTypes;
const reducingActions = {
    [ADD_COMPONENT_TYPE]: handleAddComponentType,
    [UPDATE_COMPONENT_TYPE]: handleUpdateComponentType,
};

const componentTypesReducer = createReducer(initialState, reducingActions);
export default componentTypesReducer;
