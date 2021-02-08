import { ADD_COMPONENT } from "../actions/ComponentActions";

const componentReducingActions = {

};

const componentReducer = (state = {}, action) => {
    const reducingAction = componentReducingActions[action.type];
    if (reducingAction) {
        return reducingAction(state, action.payload);
    }

    return state;
}

export default componentReducer;