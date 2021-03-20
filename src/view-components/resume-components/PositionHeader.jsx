import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"

export const PositionHeader = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const candidateName = mappedProps[PROPERTY_TYPES.Name]?.value;
    const positionTitle = mappedProps[PROPERTY_TYPES.Title]?.value;
    const primaryTextColor = mappedProps[PROPERTY_TYPES.PrimaryTextColor]?.value;
    const secondaryTextColor = mappedProps[PROPERTY_TYPES.SecondaryTextColor]?.value;

    return (
        <Container>
            <Typography align="center" variant="h3" style={{ color: primaryTextColor }}>{candidateName}</Typography>
            <Divider />
            <Typography align="center" variant="h5" style={{ color: secondaryTextColor }}>{positionTitle}</Typography>
        </Container>
    )
}

export default PositionHeader;