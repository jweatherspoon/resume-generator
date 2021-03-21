import { Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"
import TYPOGRAPHY_VARIANTS from "../../data-model/code-gen/enumerations/TypographyVariants";

export const BulletedItem = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const description = mappedProps[PROPERTY_TYPES.Description]?.value;
    const primaryTextColor = mappedProps[PROPERTY_TYPES.PrimaryTextColor]?.value;
    const variant = mappedProps[PROPERTY_TYPES.TypographyVariant]?.value || TYPOGRAPHY_VARIANTS.body1;

    return (
        <li>
            <Typography align="start" variant={variant} style={{color: primaryTextColor}}>
                {description}
            </Typography>
        </li>
    )
}

export default BulletedItem;