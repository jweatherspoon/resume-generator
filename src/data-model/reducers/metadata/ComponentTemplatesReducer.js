import { createReducer } from "../index";
import metadata from "../../metadata.json";

import { 
    ADD_COMPONENT_TEMPLATE, 
    ADD_TEMPLATED_PROPERTY, 
    UPDATE_TEMPLATED_PROPERTY, 
    ADD_TEMPLATED_CHILD, 
    UPDATE_TOP_LEVEL_PROPERTY,
    REMOVE_TEMPLATED_PROPERTY,
    REMOVE_TEMPLATED_CHILD, 
} from "../../actions/metadata/GlobalMetadataActions";

/**
 * Add a component template for a given type
 * @param {object} state - The current component templates state
 * @param {{componentType: COMPONENT_TYPES, isTopLevel: boolean}} payload - The action payload
 * @returns The next state
 */
const handleAddComponentTemplate = (state, { componentType, isTopLevel }) => {
    return {
        ...state,
        [componentType]: {
            isTopLevel,
            properties: [],
            children: [],
        }
    }
}

/**
 * Update a component template's top level property
 * @param {object} state - The current component templates state
 * @param {{componentType: COMPONENT_TYPES, fieldName: string, newValue: any}} payload - The action payload
 * @returns The next state 
 */
const handleUpdateTopLevelProperty = (state, { componentType, fieldName, newValue }) => ({
    ...state,
    [componentType]: {
        ...state[componentType],
        [fieldName]: newValue
    }
});

/**
 * Add a default property to a component template
 * @param {object} state - The current component templates state
 * @param {{componentType: COMPONENT_TYPES, propertyType: COMPONENT_TYPES}} payload - The action payload
 * @returns The next state
 */
const handleAddTemplatedProperty = (state, { componentType, propertyType }) => ({
    ...state,
    [componentType]: {
        ...state[componentType],
        properties: [...state[componentType]?.properties, propertyType]
    }
});

/**
 * Add a default child to a component template
 * @param {object} state - The current component templates state
 * @param {{parentComponentType: COMPONENT_TYPES, childComponentType: COMPONENT_TYPES}} payload - The action payload
 * @returns The next state
 */
const handleAddTemplatedChild = (state, { parentComponentType, childComponentType }) => ({
    ...state,
    [parentComponentType]: {
        ...state[parentComponentType],
        children: [...state[parentComponentType]?.children, childComponentType]
    }
});

/**
 * Remove a default property from a component template
 * @param {object} state - The current component templates state
 * @param {{componentType: COMPONENT_TYPES, propertyType: COMPONENT_TYPES}} payload - The action payload
 * @returns The next state
 */
const handleRemoveTemplatedProperty = (state, { componentType, propertyType }) => ({
    ...state,
    [componentType]: {
        ...state[componentType],
        properties: state[componentType]?.properties?.filter(propType => propType !== propertyType) || [],
    }
});

/**
 * Remove a default child from a component template
 * @param {object} state - The current component templates state
 * @param {{parentComponentType: COMPONENT_TYPES, childComponentType: COMPONENT_TYPES}} payload - The action payload
 * @returns The next state
 */
const handleRemoveTemplatedChild = (state, { parentComponentType, childComponentType }) => ({
    ...state,
    [parentComponentType]: {
        ...state[parentComponentType],
        children: state[parentComponentType]?.children?.filter(childType => childType !== childComponentType) || [],
    }
});

// pull initial state from metadata component templates and configure our reducing actions
const initialState = metadata.componentTemplates;
const reducingActions = {
    [ADD_COMPONENT_TEMPLATE]: handleAddComponentTemplate,
    [UPDATE_TOP_LEVEL_PROPERTY]: handleUpdateTopLevelProperty,
    [ADD_TEMPLATED_PROPERTY]: handleAddTemplatedProperty,
    [ADD_TEMPLATED_CHILD]: handleAddTemplatedChild,
    [REMOVE_TEMPLATED_PROPERTY]: handleRemoveTemplatedProperty,
    [REMOVE_TEMPLATED_CHILD]: handleRemoveTemplatedChild,
};

const componentTemplatesReducer = createReducer(initialState, reducingActions);
export default componentTemplatesReducer;