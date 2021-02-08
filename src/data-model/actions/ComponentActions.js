import { createAction } from "./Action";

export const ADD_COMPONENT = "ADD_COMPONENT";
export const createAddComponentAction = (payload) => createAction(ADD_COMPONENT, payload);