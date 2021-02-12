import { createAction } from "./Action";

export const UPDATE_THEME = "UPDATE_THEME";
export const createUpdateThemeAction = (theme) => createAction(UPDATE_THEME, { theme });

export const UPDATE_ACTIVE_TEMPLATE = "UPDATE_ACTIVE_TEMPLATE";
export const createUpdateActiveTemplateAction = (templateId, templateRegions) => createAction(UPDATE_ACTIVE_TEMPLATE, { templateId, templateRegions });

export const UPDATE_PAGE_CONFIGURATION = "UPDATE_PAGE_CONFIGURATION";
export const createUpdatePageConfigurationAction = (length, width) => createAction(UPDATE_PAGE_CONFIGURATION, { length, width });