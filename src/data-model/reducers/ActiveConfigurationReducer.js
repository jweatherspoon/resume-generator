import { UPDATE_ACTIVE_TEMPLATE, UPDATE_PAGE_CONFIGURATION } from "../actions/ActiveConfigurationActions";
import RESUME_SHELL_TYPES from "../ResumeShellTypes";

const activeConfigurationReducingActions = {
    [UPDATE_ACTIVE_TEMPLATE]: (state, payload) => handleUpdateActiveTemplate(state, payload),
    [UPDATE_PAGE_CONFIGURATION]: (state, payload) => handleUpdatePageConfiguration(state, payload),
};

const initialState = {
    activeTemplate: "",
    regions: [],
    theme: "",
    pageConfiguration: {
        length: 11,
        width: 8.5
    }
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

const handleUpdatePageConfiguration = (state, { length, width }) => {
    return {
        ...state,
        pageConfiguration: {
            length,
            width,
        }
    }
}

export default activeConfigurationReducer;