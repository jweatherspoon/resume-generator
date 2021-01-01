class PropertyTypes {
    get Theme() : string { return "theme" }
    get Name() : string { return "name" }
    get Title() : string { return "title" }
    get Details() : string { return "details" }
    get HasDivider() : string { return "has-divider" }
    get ContentSpacing() : string { return "content-spacing" }
    get Flair() : string { return "flair" }
}

const PROPERTY_TYPES = new PropertyTypes();
export default PROPERTY_TYPES;