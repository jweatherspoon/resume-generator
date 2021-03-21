export const copyPropertyArrayWithUpdate = (properties, propertyType, newValue) => {
    const copiedProperties = [];
    if (properties) {
        for (let property of properties) {
            if (property.propertyType === propertyType) {
                const copiedProperty = Object.assign({}, property);
                copiedProperty.value = newValue;
                copiedProperties.push(copiedProperty);
            }
            else {
                copiedProperties.push(property);
            }
        }
    }

    return copiedProperties;
}