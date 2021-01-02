import { Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import moment from "moment";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyMap } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

class EducationInformation extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.EducationInformation;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition => new EducationInformation(objectData);

    getDateString = (date: Date | undefined, format: string): string => {
        if (!date) {
            return "Present";
        }

        return moment(date).format(format);
    }

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;
        const propertyMap = getPropertyMap(properties?.source.componentProps);

        const organization = propertyMap[PROPERTY_TYPES.Organization]?.value || "";
        const beginDate = propertyMap[PROPERTY_TYPES.BeginDate]?.value || new Date();
        const endDate = propertyMap[PROPERTY_TYPES.EndDate]?.value;
        const dateFormat = propertyMap[PROPERTY_TYPES.FormatString]?.value || "";
        const degree = propertyMap[PROPERTY_TYPES.Degree]?.value || "";
        const flair = propertyMap[PROPERTY_TYPES.Flair]?.value || "  ";
        const gpa = propertyMap[PROPERTY_TYPES.Gpa]?.value;
        const field = propertyMap[PROPERTY_TYPES.Field]?.value || "";
        const description = propertyMap[PROPERTY_TYPES.Description]?.value || "";

        const beginDateText = this.getDateString(beginDate, dateFormat);
        const endDateText = this.getDateString(endDate, dateFormat);

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">{organization}</Typography>
                </Grid>

                <Grid item xs={1} />
                <Grid item xs={11}>
                    <Typography variant="body1">{`${degree}${flair}${gpa && `GPA: ${gpa}`}`}</Typography>
                </Grid>

                <Grid item xs={1} />
                <Grid item xs={11}>
                    <Typography variant="body1">{field}</Typography>
                </Grid>

                <Grid item xs={1} />
                <Grid item xs={11}>
                    <Typography variant="body1">{description}</Typography>
                </Grid>
            </Grid>
        )
    }
}
 
export default EducationInformation;