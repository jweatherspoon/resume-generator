import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes";
import { mapPropertyArrayByType } from "../../data-model/Property";

const LOGOS_PATH = "/resources/logos/";
const pngIcon = ({ logo, width, altText }) => {
    const path = `${LOGOS_PATH}/${logo}.png`
    return (
        <img width={width} src={path} alt={altText || logo} />
    );
}

const Logo = (props) => {
    const {
        properties
    } = props;

    const propertyMap = mapPropertyArrayByType(properties);
    const logo = propertyMap[PROPERTY_TYPES.Logo]?.value;
    const width = propertyMap[PROPERTY_TYPES.Width]?.value;
    const altText = propertyMap[PROPERTY_TYPES.AltText]?.value;

    return pngIcon({ logo, width, altText });
}

export default Logo;