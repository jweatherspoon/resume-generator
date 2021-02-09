import { mapObjectArrayByKey } from "../../utility/DataUtility";
import { ADD_COMPONENT } from "../actions/ComponentActions";
import { createComponentFromTemplate } from "../resume-components/ResumeComponentTemplates";
import RESUME_COMPONENT_TYPES from "../resume-components/ResumeComponentTypes";

const componentReducingActions = {
    [ADD_COMPONENT]: (state, payload) => handleAddComponent(state, payload)
};

const contactDetails = createComponentFromTemplate(RESUME_COMPONENT_TYPES.ContactDetails);
contactDetails[0].region = "sidebar";
const initialState = mapObjectArrayByKey(contactDetails, c => c.componentId);

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

export default componentReducer;