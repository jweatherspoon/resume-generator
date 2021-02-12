import { ArrayProperty, StringProperty } from '../Property';
import PROPERTY_TYPES from '../PropertyTypes';
import RESUME_COMPONENT_TYPES from "./ResumeComponentTypes";
import createContactDetails, { createContactDetailsItem } from './template-generators/ContactDetailsTemplateGenerator';
import createPositionHeader from './template-generators/PositionHeaderTemplateGenerator';

const ResumeComponentTemplateMap = {
    [RESUME_COMPONENT_TYPES.ContactDetailsItem]: createContactDetailsItem,
    [RESUME_COMPONENT_TYPES.ContactDetails]: createContactDetails,
    [RESUME_COMPONENT_TYPES.PositionHeader]: createPositionHeader,
}

export const createComponentFromTemplate = (componentType, ...args) => {
    if (ResumeComponentTemplateMap[componentType]) {
        return ResumeComponentTemplateMap[componentType](...args).flat(Infinity);
    }

    return null;
}