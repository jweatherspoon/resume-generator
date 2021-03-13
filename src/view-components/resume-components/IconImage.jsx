import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from "../../data-model/enumerations/IconEnumerationSource";

import { faLinkedin, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMobile, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons'

const IconMap = {
    [ICONS.phone]: () => faIcon(faMobile),
    [ICONS.email]: () => faIcon(faEnvelope),
    [ICONS.linkedin]: () => faIcon(faLinkedin),
    [ICONS.github]: () => faIcon(faGithub),
    [ICONS.instagram]: () => faIcon(faInstagram),
    [ICONS.twitter]: () => faIcon(faTwitter),
    [ICONS.plus]: () => faIcon(faPlus),
    [ICONS.jwLogo]: ({theme, width}) => pngIcon({icon: ICONS.jwLogo, theme, width}),
}

const faIcon = (icon) => <FontAwesomeIcon icon={icon} />

const logoPath = "/resources/logos/";
const pngIcon = ({icon, theme, width, altText}) => {
    const path = `${logoPath}/${icon}-${theme?.iconColor || "pink"}.png`
    return (
        <img width={width} src={path} alt={altText || icon} />
    );
}

const IconImage = ({theme, properties, icon, width, altText}) => {
    const propertyMap = mapPropertyArrayByType(properties);
    icon = propertyMap[PROPERTY_TYPES.Icon]?.value || icon;
    width = propertyMap[PROPERTY_TYPES.Width]?.value || width;
    altText = propertyMap[PROPERTY_TYPES.AltText]?.value || altText;

    const iconGenerator = IconMap[icon];
    if (iconGenerator) {
        return iconGenerator({theme, width, altText})
    }

    return null;
}

export default IconImage;