import EnumerationSource from "./EnumerationSource";

const iconPaths = [
    "phone",
    "email",
    "linkedin"
]

class IconEnumerationSource extends EnumerationSource {
    getEnumOptions = () => iconPaths;
}

const IconEnumSource = new IconEnumerationSource();
export default IconEnumSource;