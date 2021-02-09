import createComponent from ".";
import { StringProperty } from "../../Property"
import PROPERTY_TYPES from "../../PropertyTypes"
import RESUME_COMPONENT_TYPES from "../ResumeComponentTypes";

export const createPositionHeader = (candidateName="", positionTitle="") => {
    const defaultProperties = [
        new StringProperty(PROPERTY_TYPES.Name, candidateName),
        new StringProperty(PROPERTY_TYPES.Title, positionTitle)
    ];

    const positionHeader = createComponent(RESUME_COMPONENT_TYPES.PositionHeader, defaultProperties, [], true);
    return [positionHeader];
}

export default createPositionHeader;