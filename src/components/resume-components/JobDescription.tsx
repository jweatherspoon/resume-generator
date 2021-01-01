import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
import { Component } from "react";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyMap, getPropertyValue } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

class JobDescription extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.JobDescription;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition => new JobDescription(objectData);

    getDateString = (date: Date | undefined, format: string) : string => {
        if (!date) {
            return "Present";
        }

        return moment(date).format(format);
    }

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;
        const propertyMap = getPropertyMap(properties?.source.componentProps);

        const title = propertyMap[PROPERTY_TYPES.Title]?.value || "";
        const beginDate = propertyMap[PROPERTY_TYPES.BeginDate]?.value || new Date();
        const endDate = propertyMap[PROPERTY_TYPES.EndDate]?.value;
        const organization = propertyMap[PROPERTY_TYPES.Organization]?.value || "";
        const location = propertyMap[PROPERTY_TYPES.Location]?.value || "";
        const description = propertyMap[PROPERTY_TYPES.Description]?.value || "";
        const flair = propertyMap[PROPERTY_TYPES.Flair]?.value || "";
        const dateFormat = propertyMap[PROPERTY_TYPES.FormatString]?.value || "MMM YYYY";

        const beginDateText = this.getDateString(beginDate, dateFormat);
        const endDateText = this.getDateString(endDate, dateFormat);

        return (
            <Grid container>
                {/* company / location row  */}
                <Grid item xs={12}>
                    <Typography variant="h6">{`${organization}${flair}${location}`}</Typography>
                </Grid>
                
                {/* position / date row */}
                <Grid item xs={1} /> {/* left gutter */}
                <Grid item xs={8}>
                    <Typography variant="body1">{title}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body1" align="right">{`${beginDateText} - ${endDateText}`}</Typography>
                </Grid>

                {/* description */}
                <Grid item xs={2} /> {/* left gutter */}
                <Grid item xs={10}>
                    <Typography variant="body2">{description}</Typography>
                </Grid>
            </Grid>
        )
    }
}

export default JobDescription;