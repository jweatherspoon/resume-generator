import DATA_TYPES from "./DataTypes";
import { mapObjectArrayByKey } from "../utility/DataUtility";

class Property {
    constructor(propertyType, dataType, value) {
        this.propertyType = propertyType;
        this.dataType = dataType;
        this.value = value;
    }

    toObject() {
        return {
            propertyType: this.propertyType,
            dataType: this.dataType,
            value: this.value
        };
    }
}

export class StringProperty extends Property {
    constructor(propertyType, value) {
        super(propertyType, DATA_TYPES.String, value);
    }
}

export class ArrayProperty extends Property {
    constructor(propertyType, value) {
        super(propertyType, DATA_TYPES.Array, value || []);
    }
}

export class EnumProperty extends Property {
    constructor(propertyType, value, source) {
        super(propertyType, DATA_TYPES.Enum, value);
        this.source = source;
    }

    toObject() {
        return {
            ...super.toObject(),
            source: this.source
        };
    }
}

export class NumberProperty extends Property {
    constructor(propertyType, value) {
        super(propertyType, DATA_TYPES.Number, value || 0);
    }
}

export const mapPropertyArrayByType = propertyArray => mapObjectArrayByKey(propertyArray, p => p.propertyType);

export const createPropertyOfType = (propertyType, propertyTypes) => {
    if (propertyTypes[propertyType]) {
        return createPropertyFromTypeDefinition(propertyTypes[propertyType]);
    }

    return null;
}

export const createPropertyFromTypeDefinition = propertyTypeDefinition => {
    const { name, dataType, source } = propertyTypeDefinition;
    const propertyDefinition = { 
        dataType,
        propertyType: name, 
        value: null,
    };

    // special case data types
    if (dataType === DATA_TYPES.Enum) {
        propertyDefinition.source = source;
    }

    return propertyDefinition;
}

export default Property;