import { UPDATE_ACTIVE_TEMPLATE } from "../actions/ActiveConfigurationActions";
import RESUME_SHELL_TYPES from "../ResumeShellTypes";

const activeConfigurationReducingActions = {
    [UPDATE_ACTIVE_TEMPLATE]: (state, payload) => handleUpdateActiveTemplate(state, payload),
};

const initialState = {
    activeTemplate: "",
    regions: [],
    theme: "",
}

const activeConfigurationReducer = (state = initialState, action) => {
    const reducingAction = activeConfigurationReducingActions[action.type];
    if (reducingAction) {
        return reducingAction(state, action.payload);
    }

    return state;
}

const handleUpdateActiveTemplate = (state, { templateId, templateRegions }) => {
    return {
        ...state,
        activeTemplate: templateId,
        regions: templateRegions
    };
}

export default activeConfigurationReducer;