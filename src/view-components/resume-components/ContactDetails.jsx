import { Grid, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"
import IconImage from "./IconImage";

export const ContactDetailRow = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const details = mappedProps[PROPERTY_TYPES.Details]?.value;
    return (
        <Grid item container>
            <Grid item xs={2}>
                {mappedProps[PROPERTY_TYPES.Icon] && <IconImage properties={properties} />}
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