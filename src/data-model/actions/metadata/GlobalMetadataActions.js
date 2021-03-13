import { createAction } from "../Action";

/* ======================== BEGIN PROPERTY TYPE ACTIONS ======================== */

export const ADD_PROPERTY_TYPE = "ADD_PROPERTY_TYPE";
export const createAddPropertyTypeAction = (name, dataType) => createAction(ADD_PROPERTY_TYPE, { name, dataType });

export const UPDATE_PROPERTY_TYPE = "UPDATE_PROPERTY_TYPE";
export const createUpdatePropertyTypeAction = (id, fieldName, newValue) => createAction(UPDATE_PROPERTY_TYPE, { id, fieldName, newValue });

/* ======================== END PROPERTY TYPE ACTIONS ======================== */

/* ======================== BEGIN COMPONENT TYPE ACTIONS ======================== */

export const ADD_COMPONENT_TYPE = "ADD_COMPONENT_TYPE";
export const createAddComponentTypeAction = (name) => createAction(ADD_COMPONENT_TYPE, { name });

export const UPDATE_COMPONENT_TYPE = "UPDATE_COMPONENT_TYPE";
export const createUpdateComponentTypeAction = (id, fieldName, newValue) => createAction(UPDATE_COMPONENT_TYPE, { id, fieldName, newValue });

/* ======================== END COMPONENT TYPE ACTIONS ======================== */

/* ======================== BEGIN COMPONENT TEMPLATE ACTIONS ======================== */

// this action used for adding a new component template to metadata
export const ADD_COMPONENT_TEMPLATE = "ADD_COMPONENT_TEMPLATE";
export const createAddComponentTemplateAction = (componentType, isTopLevel) => createAction(ADD_COMPONENT_TEMPLATE, { componentType, isTopLevel });

// this action used for adding a default property to a component template
export const ADD_TEMPLATED_PROPERTY = "ADD_TEMPLATED_PROPERTY";
export const createAddTemplatedPropertyAction = (componentType, propertyType) => createAction(ADD_TEMPLATED_PROPERTY, { componentType, propertyType });

// this action used for removing a default property to a component template
export const REMOVE_TEMPLATED_PROPERTY = "REMOVE_TEMPLATED_PROPERTY";
export const createRemoveTemplatedPropertyAction = (componentType, propertyType) => createAction(REMOVE_TEMPLATED_PROPERTY, { componentType, propertyType });

// this action used for updating an existing component template's default properties -- TODO: Move this to custom templates only
export const UPDATE_TEMPLATED_PROPERTY = "UPDATE_TEMPLATED_PROPERTY";
export const createUpdateTemplatedPropertyAction = (componentType, propertyType, newValue) => createAction(UPDATE_TEMPLATED_PROPERTY, { componentType, propertyType, newValue });

// this action used for adding a default child to an existing component template
export const ADD_TEMPLATED_CHILD = "ADD_TEMPLATED_CHILD";
export const createAddTemplatedChildAction = (parentComponentType, childComponentType) => createAction(ADD_TEMPLATED_CHILD, { parentComponentType, childComponentType });

// this action used for removing a default child to an existing component template
export const REMOVE_TEMPLATED_CHILD = "REMOVE_TEMPLATED_CHILD";
export const createRemoveTemplatedChildAction = (parentComponentType, childComponentType) => createAction(REMOVE_TEMPLATED_CHILD, { parentComponentType, childComponentType });

// this action used for updating one of a component template's properties that is at the root level of the object such as isTopLevel
export const UPDATE_TOP_LEVEL_PROPERTY = "UPDATE_TOP_LEVEL_PROPERTY";
export const createUpdateTopLevelPropertyAction = (componentType, fieldName, newValue) => createAction(UPDATE_TOP_LEVEL_PROPERTY, { componentType, fieldName, newValue });

/* ======================== END COMPONENT TEMPLATE ACTIONS ======================== */