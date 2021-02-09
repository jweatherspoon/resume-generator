import { createAction } from "./Action";

export const ADD_COMPONENT = "ADD_COMPONENT";
export const createAddComponentAction = (component) => createAction(ADD_COMPONENT, { component });