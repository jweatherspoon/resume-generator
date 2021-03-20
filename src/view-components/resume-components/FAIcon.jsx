import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ICONS from "../../data-model/code-gen/enumerations/Icons";

import { faLinkedin, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMobile, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from "@material-ui/core";

const IconMap = {
    [ICONS.phone]: (props) => faIcon(faMobile, props),
    [ICONS.email]: (props) => faIcon(faEnvelope, props),
    [ICONS.linkedin]: (props) => faIcon(faLinkedin, props),
    [ICONS.github]: (props) => faIcon(faGithub, props),
    [ICONS.instagram]: (props) => faIcon(faInstagram, props),
    [ICONS.twitter]: (props) => faIcon(faTwitter, props),
    [ICONS.plus]: (props) => faIcon(faPlus, props),
}

const useStyles = makeStyles({
    icon: {
        color: (props) => props?.color && props.color,
    }
})

const faIcon = (icon, props) => <FontAwesomeIcon {...props} icon={icon} />

const logoPath = "/resources/logos/";
const pngIcon = ({icon, theme, width, altText}) => {
    const path = `${logoPath}/${icon}-${theme?.iconColor || "pink"}.png`
    return (
        <img width={width} src={path} alt={altText || icon} />
    );
}

const FAIcon = (props) => {
    const classes = useStyles(props);

    let { theme, properties, icon, width, altText, color } = props;
    
    const propertyMap = mapPropertyArrayByType(properties);
    icon = propertyMap[PROPERTY_TYPES.Icon]?.value || icon;
    width = propertyMap[PROPERTY_TYPES.Width]?.value || width;
    altText = propertyMap[PROPERTY_TYPES.AltText]?.value || altText;
    color = propertyMap[PROPERTY_TYPES.Color]?.value || color;

    const iconGenerator = IconMap[icon];
    if (iconGenerator) {
        const className = classes.icon;
        return iconGenerator({theme, width, altText, color, className})
    }

    return null;
}

export default FAIcon;