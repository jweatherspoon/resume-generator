import { Container, Divider, Typography } from "@material-ui/core";
import { Component } from "react";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyValue } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

class PositionHeader extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.PositionHeader;

    clone = (objectData: IFactoryEnabledComponentProps) : IFactoryEnabledComponentDefinition => new PositionHeader(objectData);

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;
        const candidateName = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.Name);
        const positionTitle = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.Title);
        return (
            <Container>
                <Typography align="center" variant="h5">{candidateName}</Typography>
                <Divider />
                <Typography align="center" variant="h6">{positionTitle}</Typography>
            </Container>
        )
    }
}

export default PositionHeader;