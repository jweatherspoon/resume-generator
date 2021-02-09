import { mapObjectArrayByKey } from "../../utility/DataUtility";
import { ADD_COMPONENT, UPDATE_PROPERTY } from "../actions/ComponentActions";
import { mapPropertyArrayByType } from "../Property";
import { createComponentFromTemplate } from "../resume-components/ResumeComponentTemplates";
import RESUME_COMPONENT_TYPES from "../resume-components/ResumeComponentTypes";

const componentReducingActions = {
    [ADD_COMPONENT]: (state, payload) => handleAddComponent(state, payload),
    [UPDATE_PROPERTY]: (state, payload) => handleUpdateProperty(state, payload),
};

const contactDetails = createComponentFromTemplate(RESUME_COMPONENT_TYPES.ContactDetails);
contactDetails[0].region = "sidebar";
const positionHeader = createComponentFromTemplate(RESUME_COMPONENT_TYPES.PositionHeader, "Jon Weatherspoon", "Software Engineer");
positionHeader[0].region = "mainContent";

const initialState = mapObjectArrayByKey([...contactDetails, ...positionHeader], c => c.componentId);

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

const copyPropertyArrayWithUpdate = (properties, propertyType, newValue) => {
    const copiedProperties = [];
    if (properties) {
        for (let property of properties) {
            if (property.propertyType === propertyType) {
                const copiedProperty = Object.assign({}, property);
                copiedProperty.value = newValue;
                copiedProperties.push(copiedProperty);
            }
            else {
                copiedProperties.push(property);
            }
        }
    }

    return copiedProperties;
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

        // const propertyIndex = component?.properties.indexOf(p => p.propertyType === propertyType);
        // console.log(component?.properties);
        // if (propertyIndex !== -1) {
        //     const copiedProperty = Object.assign({}, component.properties[propertyIndex]);
        //     copiedProperty.value = newValue;

        //     console.log(copiedProperty);

        //     const copiedComponent = Object.assign({}, component);
        //     copiedComponent.properties = [
        //         ...component.properties.slice(0, propertyIndex),
        //         copiedProperty,
        //         ...component.properties.slice(propertyIndex + 1)
        //     ];

            
        // }
    }

    return state;
}

export default componentReducer;