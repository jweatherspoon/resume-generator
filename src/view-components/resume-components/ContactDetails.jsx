import { Grid, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/PropertyTypes"

export const ContactDetailRow = ({ properties, componentId }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const icon = mappedProps[PROPERTY_TYPES.Icon]?.value;
    const altText = mappedProps[PROPERTY_TYPES]?.value;
    const details = mappedProps[PROPERTY_TYPES.Details]?.value;
    return (
        <Grid item container>
            <Grid item xs={2}>
                {icon && <img src={icon} alt={altText || "contact-detail icon"} />}
            </Grid>
            <Grid item>
                <Typography variant="body1" align="center">{details}</Typography>
            </Grid>
        </Grid>
    )
}

export const ContactDetails = ({allComponents, children}) => {
    const rows = allComponents && children?.map((c, i) => <ContactDetailRow key={i} {...allComponents[c]} />);
    return (
        <Grid container>
            {rows}
        </Grid>
    )
}

export default ContactDetails;