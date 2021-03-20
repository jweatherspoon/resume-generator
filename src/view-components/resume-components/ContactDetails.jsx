import { Grid, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"
import FAIcon from "./FAIcon";

export const ContactDetailRow = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const details = mappedProps[PROPERTY_TYPES.Details]?.value;
    const color = mappedProps[PROPERTY_TYPES.PrimaryTextColor]?.value;
    return (
        <Grid item container style={{ color: color && color }}>
            <Grid item xs={2}>
                {mappedProps[PROPERTY_TYPES.Icon] && <FAIcon properties={properties} color={color} />}
            </Grid>
            <Grid item>
                <Typography variant="body1" align="center">{details}</Typography>
            </Grid>
        </Grid>
    )
}

const createContactDetailsItem = (component, textColor, key) => {
    const properties = [
        ...(component?.properties),
        textColor,
    ];

    return (
        <ContactDetailRow key={key && `contact-details-${key}`} {...component} properties={properties} />
    );
}

export const ContactDetails = ({allComponents, children, properties}) => {
    const textColorProperty = properties?.find(prop => prop.propertyType === PROPERTY_TYPES.PrimaryTextColor);
    const rows = allComponents && children?.map((c, i) => createContactDetailsItem(allComponents[c], textColorProperty, i));
    return (
        <Grid container>
            {rows}
        </Grid>
    )
}

export default ContactDetails;