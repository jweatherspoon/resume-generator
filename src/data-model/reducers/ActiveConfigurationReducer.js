import RESUME_SHELL_TYPES from "../ResumeShellTypes";

const activeConfigurationReducingActions = {
};

const initialState = {
    activeTemplate: RESUME_SHELL_TYPES.Flashy,
}

const activeConfigurationReducer = (state = initialState, action) => {
    const reducingAction = activeConfigurationReducingActions[action.type];
    if (reducingAction) {
        return reducingAction(state, action.payload);
    }

    return state;
}

export default activeConfigurationReducer;