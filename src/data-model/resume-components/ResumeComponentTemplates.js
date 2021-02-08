import { v4 as uuidv4 } from 'uuid';
import { ArrayProperty, StringProperty } from '../Property';
import PROPERTY_TYPES from '../PropertyTypes';
import RESUME_COMPONENT_TYPES from "./ResumeComponentTypes";

const createComponent = (type, properties, children) => ({
    componentId: uuidv4(),
    componentType: type,
    properties: properties || [],
    children: children?.flat(Infinity).map(c => c.componentId) || []
});

const createContactDetailsItem = (icon="", details="") => {
    const defaultProperties = [
        new StringProperty(PROPERTY_TYPES.Icon, icon).toObject(),
        new StringProperty(PROPERTY_TYPES.Details, details).toObject()
    ];

    const contactDetailItem = createComponent(RESUME_COMPONENT_TYPES.ContactDetailsItem, defaultProperties);
    return [contactDetailItem];
}

const createContactDetails = () => {
    const defaultProperties = [];

    const defaultChildren = [
        createContactDetailsItem("phone", "(xxx) xxx-xxxx"),
        createContactDetailsItem("email", "xxxxx@xxx.com"),
        createContactDetailsItem("linkedin", "@xxxxx"),
    ];

    const contactDetails = createComponent(RESUME_COMPONENT_TYPES.ContactDetails, defaultProperties, defaultChildren);
    return [contactDetails, ...defaultChildren];
}

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