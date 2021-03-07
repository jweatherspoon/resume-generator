import { createAction } from "../Action";

export const ADD_PROPERTY_TYPE = "ADD_PROPERTY_TYPE";
export const createAddPropertyTypeAction = (name, dataType) => createAction(ADD_PROPERTY_TYPE, { name, dataType });