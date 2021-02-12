import createComponent from ".";
import ENUM_SOURCES from "../../enumerations/EnumSources";
import PROPERTY_TYPES from "../../PropertyTypes";
import RESUME_COMPONENT_TYPES from "../ResumeComponentTypes";

import { EnumProperty, NumberProperty, StringProperty } from "../../Property";

export const createIconImage = (icon = "", width=10, altText="") => {
    const defaultProperties = [
        new EnumProperty(PROPERTY_TYPES.Icon, icon, ENUM_SOURCES.Icons).toObject(),
        new NumberProperty(PROPERTY_TYPES.Width, width).toObject(),
        new StringProperty(PROPERTY_TYPES.AltText, altText || icon).toObject(),
    ];

    const iconImage = createComponent(`${icon} Icon`, RESUME_COMPONENT_TYPES.IconImage, defaultProperties);
    return [iconImage];
}

export default createIconImage;