import { Typography, Grid } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"
import BulletedItem from "./BulletedItem";

export const EducationItem = ({ allComponents, children, properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const primaryTextColor = mappedProps[PROPERTY_TYPES.PrimaryTextColor]?.value;
    const secondaryTextColor = mappedProps[PROPERTY_TYPES.SecondaryTextColor]?.value;
    
    const degree = mappedProps[PROPERTY_TYPES.Degree]?.value;
    const gpa = mappedProps[PROPERTY_TYPES.Gpa]?.value;
    const field = mappedProps[PROPERTY_TYPES.Field]?.value;
    const organization = mappedProps[PROPERTY_TYPES.Organization]?.value;

    const bullets = children?.map((componentId, i) => (<BulletedItem key={`education-bullet-${i}`} {...allComponents[componentId]} />));
    return (
        <Grid item container style={{ color: primaryTextColor }}>
            <Grid item xs={12}>
                <Typography>
                    <strong>
                        {organization}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography>
                    {degree}
                </Typography>
            </Grid>
            {gpa && (
                <Grid item xs={4}>
                    <Typography>
                        GPA: {gpa}
                    </Typography>
                </Grid>
            )}
            {field && (
                <Grid item xs={12}>
                    {field}
                </Grid>
            )}
            <Grid item xs={12}>
                <ul>
                    {bullets}
                </ul>
            </Grid>
        </Grid>
    )
}

export default EducationItem;