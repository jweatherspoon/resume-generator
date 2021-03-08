import EnumerationSource from "./EnumerationSource";

const allIcons = [
    "phone",
    "email",
    "linkedin",
    "github",
    "instagram",
    "twitter",
    "plus",
    "jwLogo",
];

export const ICONS = Object.assign({}, ...allIcons.map(x => ({[x]: x})));

class IconEnumerationSource extends EnumerationSource {
    getEnumOptions = () => allIcons;
}

const IconEnumSource = new IconEnumerationSource();
export default IconEnumSource;