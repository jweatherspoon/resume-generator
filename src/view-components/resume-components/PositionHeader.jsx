import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"

export const PositionHeader = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const candidateName = mappedProps[PROPERTY_TYPES.Name]?.value;
    const positionTitle = mappedProps[PROPERTY_TYPES.Title]?.value;
    const primaryTextColor = mappedProps[PROPERTY_TYPES.PrimaryTextColor]?.value;
    const secondaryTextColor = mappedProps[PROPERTY_TYPES.SecondaryTextColor]?.value;
    const hasDivider = mappedProps[PROPERTY_TYPES.HasDivider]?.value;
    const dividerColor = mappedProps[PROPERTY_TYPES.DividerColor]?.value;

    return (
        <Container>
            <Typography align="center" variant="h3" paragraph style={{ color: primaryTextColor }}>{candidateName}</Typography>
            <Typography align="center" variant="h5" gutterBottom style={{ color: secondaryTextColor }}>{positionTitle}</Typography>
            {hasDivider && <Divider style={{ background: dividerColor }} />}
        </Container>
    )
}

export default PositionHeader;