import { Container, Grid } from '@material-ui/core';
import ComponentEditorFactory from './editors/ComponentEditorFactory';

const ResumeConfigEditor = ({components}) => {
    const componentEditors = Object.values(components || {}).filter(c => c.isTopLevel).map((c, i) => (
        <Grid item container key={i}>
            <ComponentEditorFactory component={c} allComponents={components} />
        </Grid>
    ));
    return (
        <Grid container>
            {componentEditors}
        </Grid>
    )
}

export default ResumeConfigEditor;