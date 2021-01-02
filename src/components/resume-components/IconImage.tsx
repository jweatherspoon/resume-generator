import { Grid } from "@material-ui/core";
import { Component } from "react";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyMap, getPropertyValue } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

class IconImage extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.IconImage;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition => new IconImage(objectData);

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;
        const propertyMap = getPropertyMap(properties?.source.componentProps);

        const iconSource = propertyMap[PROPERTY_TYPES.ImageSource]?.value || "";
        const iconWidth = propertyMap[PROPERTY_TYPES.Width]?.value;
        const altText = propertyMap[PROPERTY_TYPES.AltText]?.value || "";

        return (
            <Grid container justify="center">
                <img alt={altText} src={iconSource} width={iconWidth} />
            </Grid>
        )
    }
}

export default IconImage;