class PropertyTypes {
    get Theme() : string { return "theme" }
    get Name() : string { return "name" }
    get Title(): string { return "title" }
    get Details(): string { return "details" }
}

const PROPERTY_TYPES = new PropertyTypes();
export default PROPERTY_TYPES;