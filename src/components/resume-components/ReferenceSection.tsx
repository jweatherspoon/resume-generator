import { Container, Divider, Typography } from "@material-ui/core";
import { Component } from "react";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyValue } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

class ReferenceSection extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.ReferenceSection;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition => new ReferenceSection(objectData);

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;

        const contentSpacing = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.ContentSpacing) || 0;
        const hasDivider = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.HasDivider) as boolean|| true;

        return (
            <Container style={{ bottom: 0, position: "fixed", width: "100%" }} className="fullheight">
                {hasDivider && <Divider />}
                <Typography align="center" variant="body1" style={{
                    letterSpacing: `${contentSpacing}px`
                }}>REFERENCES AVAILABLE UPON REQUEST</Typography>
            </Container>
        )
    }
}

export default ReferenceSection;