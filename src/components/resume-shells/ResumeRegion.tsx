import { Grid } from "@material-ui/core";
import { FunctionComponent, PropsWithChildren } from "react";
import { IResumeRegion } from "../../data-model/ResumeConfiguration";
import FACTORIES from "../factory/factory-maps";
import { IFactoryEnabledComponentProps } from "../factory/IFactoryEnabledComponent";
import ComponentFactory from "../factory/ComponentFactory";

export interface IResumeRegionProps {
    regionInfo: IResumeRegion
}

const ResumeRegion: FunctionComponent<PropsWithChildren<IResumeRegionProps>> = ({regionInfo}) => {
    const resumeComponents = regionInfo.components.map((x: IFactoryEnabledComponentProps, i: number) => (
        <ComponentFactory map={FACTORIES.resumeComponents} objectData={x} key={i} />
    ));
    
    console.log(resumeComponents);

    return (
        <Grid item xs={regionInfo.width || 12}>
            {resumeComponents}
        </Grid>
    )
}

export default ResumeRegion;