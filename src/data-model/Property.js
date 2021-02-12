import { mapObjectArrayByKey } from "../utility/DataUtility";
import DATA_TYPES from "./DataTypes";

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

export const mapPropertyArrayByType = propertyArray => mapObjectArrayByKey(propertyArray, p => p.propertyType);

export default Property;