import { Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyValue } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

const ContactDetailRow = ({icon, detail} : any) => (
    <Grid item container>
        <Grid item xs={2}>
            {icon && <img src={icon} alt="contact-detail icon" />}
        </Grid>
        <Grid item>
            <Typography variant="body1" align="center">{detail}</Typography>
        </Grid>
    </Grid>
);

class ContactDetails extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.ContactDetails;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition => new ContactDetails(objectData);

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;
        const detailInfo = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.Details) as [];
        const details = detailInfo?.map((x : any, i : number) => (
            <ContactDetailRow key={i} icon={x.icon} detail={x.detail} />
        ))
        return (
            <Grid container>
                {details}
            </Grid>
        )
    }
}

export default ContactDetails;