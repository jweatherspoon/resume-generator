import DATA_TYPES from "./DataTypes";
import { mapObjectArrayByKey } from "../utility/DataUtility";

export const mapPropertyArrayByType = propertyArray => mapObjectArrayByKey(propertyArray, p => p.propertyType);

export const createPropertyOfType = (propertyType, propertyTypes) => {
    if (propertyTypes[propertyType]) {
        return createPropertyFromTypeDefinition({propertyType, ...propertyTypes[propertyType]});
    }

    return null;
}

export const createPropertyFromTypeDefinition = propertyTypeDefinition => {
    const { name, propertyType, dataType, source } = propertyTypeDefinition;
    const propertyDefinition = { 
        name,
        dataType,
        propertyType, 
        value: null,
    };

    // special case data types
    if (dataType === DATA_TYPES.Enum) {
        propertyDefinition.source = source;
    }

    return propertyDefinition;
}

export default createPropertyOfType;