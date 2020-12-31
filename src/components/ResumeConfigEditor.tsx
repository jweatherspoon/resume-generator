import { Box, Button, Container, Typography } from '@material-ui/core';
import { FunctionComponent } from 'react';
import TestConfig from '../data-model/test-config';
import IResumeConfigurationProps from './IResumeConfigurationProps';

const ResumeConfigEditor : FunctionComponent<IResumeConfigurationProps> = ({config}) => (
    <Container className="fullHeight">
        <Typography align="center"  variant="h3">TODO: Editor Section</Typography>
    </Container>
);

export default ResumeConfigEditor;