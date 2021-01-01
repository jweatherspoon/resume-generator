import { Divider, Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import RESUME_COMPONENT_IDS from ".";
import { getPropertyValue } from "../../data-model";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import FACTORIES from "../../factory/factory-maps";
import { ListComponentFactory } from '../ComponentFactory';
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "../../factory/IFactoryEnabledComponent";

class HeaderedContentSection extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string = RESUME_COMPONENT_IDS.HeaderedContentSection;

    clone = (objectData: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition => new HeaderedContentSection(objectData);

    render() {
        const properties = this.props as IFactoryEnabledComponentProps;
        
        const title = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.Title);
        const contentSpacing = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.ContentSpacing);
        const hasDivider = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.HasDivider) as Boolean;
        const flair = getPropertyValue(properties?.source.componentProps, PROPERTY_TYPES.Flair);

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" style={{
                        letterSpacing: `${contentSpacing}px`
                    }}>{`${title} ${flair}`}</Typography>
                </Grid>

                {hasDivider && (
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                )}

                <Grid item xs={12}>
                    <ListComponentFactory map={FACTORIES.resumeComponents} 
                        objectDatas={properties?.source.childrenData} />
                </Grid>
            </Grid>
        )
    }
}

export default HeaderedContentSection;