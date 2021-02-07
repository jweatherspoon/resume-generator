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

export default Property;