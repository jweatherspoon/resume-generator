import { ADD_COMPONENT } from "../actions/ComponentActions";

const initialState = [];

const componentReducingActions = {

};

const componentReducer = (state = initialState, action) => {
    const reducingAction = componentReducingActions[action.type];
    if (reducingAction) {
        return reducingAction(state, action.payload);
    }

    return state;
}

export default componentReducer;