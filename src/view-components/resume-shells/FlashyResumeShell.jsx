import { Grid } from "@material-ui/core"
import ResumeRegion from "./ResumeRegion"

const FlashyResumeShell = ({regionMappedComponents}) => (
    <Grid container>
        <ResumeRegion regionInfo={{
            width: 5,
            components: regionMappedComponents.sidebar
        }} />
        <ResumeRegion regionInfo={{
            width: 7,
            components: regionMappedComponents.mainContent
        }} />
    </Grid>
)

export default FlashyResumeShell;