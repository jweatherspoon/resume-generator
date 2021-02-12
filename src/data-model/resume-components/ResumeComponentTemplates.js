import RESUME_COMPONENT_TYPES from "./ResumeComponentTypes";
import createContactDetails, { createContactDetailsItem } from './template-generators/ContactDetailsTemplateGenerator';
import createIconImage from './template-generators/IconImage';
import createPositionHeader from './template-generators/PositionHeaderTemplateGenerator';

const ResumeComponentTemplateMap = {
    [RESUME_COMPONENT_TYPES.ContactDetailsItem]: createContactDetailsItem,
    [RESUME_COMPONENT_TYPES.ContactDetails]: createContactDetails,
    [RESUME_COMPONENT_TYPES.PositionHeader]: createPositionHeader,
    [RESUME_COMPONENT_TYPES.IconImage]: createIconImage,
}

export const createComponentFromTemplate = (componentType, ...args) => {
    if (ResumeComponentTemplateMap[componentType]) {
        return ResumeComponentTemplateMap[componentType](...args).flat(Infinity);
    }

    return null;
}