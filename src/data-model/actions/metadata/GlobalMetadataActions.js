import { createAction } from "../Action";

export const ADD_PROPERTY_TYPE = "ADD_PROPERTY_TYPE";
export const createAddPropertyTypeAction = (name, dataType) => createAction(ADD_PROPERTY_TYPE, { name, dataType });

export const UPDATE_PROPERTY_TYPE = "UPDATE_PROPERTY_TYPE";
export const createUpdatePropertyTypeAction = (id, fieldName, newValue) => createAction(UPDATE_PROPERTY_TYPE, { id, fieldName, newValue });