import { ADD_COMPONENT, UPDATE_PROPERTY } from "../actions/ComponentActions";
import { copyPropertyArrayWithUpdate } from "../../utility/PropertyUtility";

const componentReducingActions = {
    [ADD_COMPONENT]: (state, payload) => handleAddComponent(state, payload),
    [UPDATE_PROPERTY]: (state, payload) => handleUpdateProperty(state, payload),
};

const initialState = {};

const componentReducer = (state = initialState, action) => {
    const reducingAction = componentReducingActions[action.type];
    if (reducingAction) {
        return reducingAction(state, action.payload);
    }

    return state;
}

const handleAddComponent = (state, { component }) => {
    if (component?.componentId) {
        const newState = Object.assign({}, state);
        newState[component.componentId] = component;
        return newState;
    }

    return state;
}

const handleUpdateProperty = (state, { componentId, propertyType, newValue }) => {
    const component = state[componentId];
    if (component) {
        const copiedComponent = Object.assign({}, component);
        copiedComponent.properties = copyPropertyArrayWithUpdate(component.properties, propertyType, newValue);
        return {
            ...state,
            [componentId]: copiedComponent
        };
    }

    return state;
}

export default componentReducer;