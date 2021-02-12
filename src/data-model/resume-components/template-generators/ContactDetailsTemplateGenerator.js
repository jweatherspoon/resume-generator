import createComponent from ".";
import ENUM_SOURCES from "../../enumerations/EnumSources";
import PROPERTY_TYPES from "../../PropertyTypes";
import RESUME_COMPONENT_TYPES from "../ResumeComponentTypes";

import { EnumProperty, StringProperty } from "../../Property";

export const createContactDetailsItem = (icon = "", details = "") => {
    const defaultProperties = [
        new EnumProperty(PROPERTY_TYPES.Icon, icon, ENUM_SOURCES.Icons).toObject(),
        new StringProperty(PROPERTY_TYPES.Details, details).toObject()
    ];

    const contactDetailItem = createComponent("Contact Details Item", RESUME_COMPONENT_TYPES.ContactDetailsItem, defaultProperties);
    return [contactDetailItem];
}

export const createContactDetails = () => {
    const defaultChildren = [
        createContactDetailsItem("phone", "(xxx) xxx-xxxx"),
        createContactDetailsItem("email", "xxxxx@xxx.com"),
        createContactDetailsItem("linkedin", "@xxxxx"),
    ];

    const contactDetails = createComponent("Contact Details", RESUME_COMPONENT_TYPES.ContactDetails, [], defaultChildren, true);
    return [contactDetails, ...defaultChildren];
}

export default createContactDetails;