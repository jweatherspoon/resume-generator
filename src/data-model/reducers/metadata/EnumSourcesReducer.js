import metadata from "../../metadata.json";
import { createReducer } from "../index";
import { getUniqueTypeId } from "./utilities";

import {
    ADD_ENUM_SOURCE,
    UPDATE_ENUM_SOURCE_TOP_LEVEL_PROPERTY,
    ADD_ENUM_SOURCE_OPTION,
    REMOVE_ENUM_SOURCE_OPTION,
    UPDATE_ENUM_SOURCE_OPTION,
} from "../../actions/metadata/GlobalMetadataActions";

/**
 * Handle adding a new enum source to the redux store
 * @param {object} state - The current enum sources state
 * @param {{name: string, isStatic: boolean}} payload - The action payload
 * @returns The next state
 */
const handleAddEnumSource = (state, { name, isStatic }) => {
    return {
        ...state,
        [getUniqueTypeId(Object.keys(state))]: {
            name,
            isStatic,
            options: [],
            importName: "",
            exportName: "",
        }
    }
}

/**
 * Handle updating an existing enum source in metadata
 * @param {object} state - The current enum sources state
 * @param {{id: string, fieldName: string, newValue: any}} payload - The action payload
 * @returns The next state
 */
const handleUpdateEnumSourceTopLevelProperty = (state, { id, fieldName, newValue }) => {
    const copiedEnumSource = Object.assign({}, state[id]);
    copiedEnumSource[fieldName] = newValue;
    return {
        ...state,
        [id]: copiedEnumSource
    }
}

/**
 * Handle adding a new option to a static enum source
 * @param {object} state - The current enum sources state
 * @param {{enumSourceId: string, option: string}} payload - The action payload
 * @returns The next state
 */
const handleAddEnumSourceOption = (state, { enumSourceId, option }) => {
    const options = state[enumSourceId]?.options || [];
    return {
        ...state,
        [enumSourceId]: {
            ...state[enumSourceId],
            options: [...options, option]
        }
    }
};

/**
 * Handle updating an existing option for a static enum source
 * @param {object} state - The current enum sources state
 * @param {{enumSourceId: string, index: number, newValue: string}} payload - The action payload
 * @returns The next state
 */
const handleUpdateEnumSourceOption = (state, { enumSourceId, index, newValue }) => {
    const options = state[enumSourceId]?.options || [];
    const copiedOptions = [...options];
    if (index >= 0 && index < copiedOptions.length) {
        copiedOptions[index] = newValue;
    }

    return {
        ...state,
        [enumSourceId]: {
            ...state[enumSourceId],
            options: copiedOptions
        }
    }
};

/**
 * Handle removing a new option from a static enum source
 * @param {object} state - The current enum sources state
 * @param {{enumSourceId: string, option: string}} payload - The action payload
 * @returns The next state
 */
const handleRemoveEnumSourceOption = (state, { enumSourceId, option }) => ({
    ...state,
    [enumSourceId]: {
        ...state[enumSourceId],
        options: state[enumSourceId].options.filter(o => o !== option)
    }
});

// pull initial state from metadata enum sources and configure our reducing actions
const initialState = metadata.enumSources;
const reducingActions = {
    [ADD_ENUM_SOURCE]: handleAddEnumSource,
    [UPDATE_ENUM_SOURCE_TOP_LEVEL_PROPERTY]: handleUpdateEnumSourceTopLevelProperty,
    [ADD_ENUM_SOURCE_OPTION]: handleAddEnumSourceOption,
    [UPDATE_ENUM_SOURCE_OPTION]: handleUpdateEnumSourceOption,
    [REMOVE_ENUM_SOURCE_OPTION]: handleRemoveEnumSourceOption,
};

const enumSourcesReducer = createReducer(initialState, reducingActions);
export default enumSourcesReducer;
