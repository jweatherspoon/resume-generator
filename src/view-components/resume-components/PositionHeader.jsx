import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/PropertyTypes"

export const PositionHeader = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const candidateName = mappedProps[PROPERTY_TYPES.Name]?.value;
    const positionTitle = mappedProps[PROPERTY_TYPES.Title]?.value;
    return (
        <Container>
            <Typography align="center" variant="h3">{candidateName}</Typography>
            <Divider />
            <Typography align="center" variant="h5">{positionTitle}</Typography>
        </Container>
    )
}

export default PositionHeader;