import { Grid } from "@material-ui/core";
import { FunctionComponent } from "react";
import { IResumeRegion } from "../../data-model/ResumeConfiguration";

export interface IResumeRegionProps {
    regionInfo: IResumeRegion
}

const ResumeRegion : FunctionComponent<IResumeRegionProps> = (regionInfo: IResumeRegionProps, {width, components}) => (
    <Grid item xs={width || 12}>
        {components}
    </Grid>
)

export default ResumeRegion;