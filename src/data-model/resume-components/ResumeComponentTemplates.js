import { ArrayProperty, StringProperty } from '../Property';
import PROPERTY_TYPES from '../PropertyTypes';
import RESUME_COMPONENT_TYPES from "./ResumeComponentTypes";
import createContactDetails, { createContactDetailsItem } from './template-generators/ContactDetailsTemplateGenerator';

const ResumeComponentTemplateMap = {
    [RESUME_COMPONENT_TYPES.ContactDetailsItem]: createContactDetailsItem,
    [RESUME_COMPONENT_TYPES.ContactDetails]: createContactDetails,
}

export const createComponentFromTemplate = (componentType) => {
    if (ResumeComponentTemplateMap[componentType]) {
        return ResumeComponentTemplateMap[componentType]().flat(Infinity);
    }

    return null;
}