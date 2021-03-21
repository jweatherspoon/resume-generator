import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { mapPropertyArrayByType } from "../../data-model/Property";
import PROPERTY_TYPES from "../../data-model/code-gen/PropertyTypes"
import TYPOGRAPHY_VARIANTS from "../../data-model/code-gen/enumerations/TypographyVariants";

const useStyles = makeStyles({
    headerText: {
        color: props => props?.color,
        letterSpacing: props => `${props?.contentSpacing}px`,
    }
})

export const SimpleHeader = ({ properties }) => {
    const mappedProps = mapPropertyArrayByType(properties);
    const title = mappedProps[PROPERTY_TYPES.Title]?.value;
    const primaryTextColor = mappedProps[PROPERTY_TYPES.PrimaryTextColor]?.value;
    const hasDivider = mappedProps[PROPERTY_TYPES.HasDivider]?.value;
    const contentSpacing = mappedProps[PROPERTY_TYPES.ContentSpacing]?.value;
    const dividerColor = mappedProps[PROPERTY_TYPES.DividerColor]?.value || primaryTextColor;
    const variant = mappedProps[PROPERTY_TYPES.TypographyVariant]?.value || TYPOGRAPHY_VARIANTS.h6;
    const flair = mappedProps[PROPERTY_TYPES.Flair]?.value || "";
    
    const headerText = title + flair;

    const classes = useStyles({
        color: primaryTextColor,
        contentSpacing
    });

    return (
        <Grid item>
            <Typography align="start" variant={variant} className={classes.headerText}>{headerText}</Typography>
            {hasDivider && <Divider style={{ background: dividerColor }} />}
        </Grid>
    )
}

export default SimpleHeader;