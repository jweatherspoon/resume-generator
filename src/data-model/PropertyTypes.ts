class PropertyTypes {
    get Theme() : string { return "theme" }
    get Name() : string { return "name" }
    get Title() : string { return "title" }
    get Details() : string { return "details" }
    get HasDivider() : string { return "has-divider" }
    get ContentSpacing() : string { return "content-spacing" }
    get Flair() : string { return "flair" }
    get Organization() : string { return "organization" }
    get Location() : string { return "location" }
    get BeginDate() : string { return "begin-date" }
    get EndDate() : string { return "end-date" }
    get Description() : string { return "description" } 
    get FormatString() : string { return "format-string" }
    get ImageSource() : string { return "image-source" } 
    get Width() : string { return "width" } 
    get AltText() : string { return "alt-text" } 
    get Gpa() : string { return "gpa" } 
    get Degree() : string { return "degree" } 
    get Field() : string { return "field" } 
    get Font() : string { return "font" } 
    get FontWeight() : string { return "font-weight" } 
}

const PROPERTY_TYPES = new PropertyTypes();
export default PROPERTY_TYPES;