import { Box, Button, Container, Typography } from '@material-ui/core';
import ComponentEditorFactory from './editors/ComponentEditorFactory';

const ResumeConfigEditor = ({components}) => {
    const componentEditors = Object.values(components || {}).map((c, i) => (<ComponentEditorFactory key={i} component={c} />));
    return (
        <Container>
            {componentEditors}
        </Container>
    )
}

export default ResumeConfigEditor;