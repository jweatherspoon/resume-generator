import createComponent from ".";
import { StringProperty } from "../../Property";
import PROPERTY_TYPES from "../../PropertyTypes";
import RESUME_COMPONENT_TYPES from "../ResumeComponentTypes";

export const createContactDetailsItem = (icon = "", details = "") => {
    const defaultProperties = [
        new StringProperty(PROPERTY_TYPES.Icon, icon).toObject(),
        new StringProperty(PROPERTY_TYPES.Details, details).toObject()
    ];

    const contactDetailItem = createComponent(RESUME_COMPONENT_TYPES.ContactDetailsItem, defaultProperties);
    return [contactDetailItem];
}

export const createContactDetails = () => {
    const defaultChildren = [
        createContactDetailsItem("phone", "(xxx) xxx-xxxx"),
        createContactDetailsItem("email", "xxxxx@xxx.com"),
        createContactDetailsItem("linkedin", "@xxxxx"),
    ];

    const contactDetails = createComponent(RESUME_COMPONENT_TYPES.ContactDetails, [], defaultChildren, true);
    return [contactDetails, ...defaultChildren];
}

export default createContactDetails;