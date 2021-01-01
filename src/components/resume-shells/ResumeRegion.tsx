import { Grid } from "@material-ui/core";
import { FunctionComponent, PropsWithChildren } from "react";
import { IResumeRegion } from "../../data-model/ResumeConfiguration";
import FACTORIES from "../../factory/factory-maps";
import { ListComponentFactory } from "../ComponentFactory";

export interface IResumeRegionProps {
    regionInfo: IResumeRegion
}

const ResumeRegion: FunctionComponent<PropsWithChildren<IResumeRegionProps>> = ({regionInfo}) => {
    return (
        <Grid item xs={regionInfo.width || 12}>
            <ListComponentFactory map={FACTORIES.resumeComponents} objectDatas={regionInfo.components} />
        </Grid>
    )
}

export default ResumeRegion;