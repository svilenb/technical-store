import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from './components/ProTip';
import DefaultLayout from "./layouts/default"

export default function Index(props) {
  return (
    <DefaultLayout {...props}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {props.content}
        </Typography>
        <ProTip />
      </Box>
    </DefaultLayout>
  );
}
