import DATA_TYPES from "./DataTypes";

class Property {
    constructor(propertyType, dataType, value) {
        this.propertyType = propertyType;
        this.dataType = dataType;
        this.value = value;
    }

    toObject = () => ({
        propertyType: this.propertyType,
        dataType: this.dataType,
        value: this.value
    });
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

export default Property;