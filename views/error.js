import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from './components/ProTip';
import Link from '@material-ui/core/Link';

export default function Error(props) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="body1" gutterBottom>
          {props.message}
        </Typography>
        <Typography variant="body2" gutterBottom>
        {props.error.status}
        </Typography>
        <pre>
          {props.error.stack}
        </pre>
      </Box>
    </Container>
  );
}
