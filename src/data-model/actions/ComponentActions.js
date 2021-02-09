import { createAction } from "./Action";

export const ADD_COMPONENT = "ADD_COMPONENT";
export const createAddComponentAction = (component) => createAction(ADD_COMPONENT, { component });

export const UPDATE_PROPERTY = "UPDATE_PROPERTY";
export const createUpdatePropertyAction = (componentId, propertyType, newValue) => createAction(UPDATE_PROPERTY, { componentId, propertyType, newValue });