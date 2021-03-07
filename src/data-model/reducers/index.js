export const createReducer = (initialState, reducingActions) => {
    return (state = initialState, action) => {
        const reducingAction = reducingActions[action.type];
        if (reducingAction) {
            return reducingAction(state, action.payload);
        }

        return state;
    }
}