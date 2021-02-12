import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from "../../data-model/enumerations/IconEnumerationSource";

import { faLinkedin, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const IconMap = {
    [ICONS.phone]: () => faIcon(faMobile),
    [ICONS.email]: () => faIcon(faEnvelope),
    [ICONS.linkedin]: () => faIcon(faLinkedin),
    [ICONS.github]: () => faIcon(faGithub),
    [ICONS.instagram]: () => faIcon(faInstagram),
    [ICONS.twitter]: () => faIcon(faTwitter),
    // [ICONS.jwLogo]: () => faIcon(faEnvelope),
}

const faIcon = (icon) => <FontAwesomeIcon icon={icon} />

const IconImage = ({theme, properties}) => {
    const propertyMap = mapPropertyArrayByType(properties);
    const icon = propertyMap[PROPERTY_TYPES.Icon]?.value;
    const width = propertyMap[PROPERTY_TYPES.Width]?.value;
    const altText = propertyMap[PROPERTY_TYPES.AltText]?.value;

    const iconGenerator = IconMap[icon];
    if (iconGenerator) {
        return iconGenerator({width, altText})
    }

    return null;
}

export default IconImage;