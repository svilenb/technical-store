import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CategoriesNav from "./components/CategoriesNav";
import ProTip from './components/ProTip';
import DefaultLayout from "./layouts/default"

export default function Index(props) {
  return (
    <DefaultLayout {...props}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <CategoriesNav {...props} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              {props.content}
            </Typography>
            <ProTip />
          </Box>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
