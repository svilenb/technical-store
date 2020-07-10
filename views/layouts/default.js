import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { SnackbarProvider } from "notistack"
import AppBar from "./AppBar";

const useStyles = makeStyles(function(theme) {
  return {
    accordionRoot: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  };
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function DefaultLayout(props) {
  const classes = useStyles();

  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <AppBar {...props} />
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <div className={classes.accordionRoot}>
                {
                  props.categories.map(function(category) {
                    return (
                      <Accordion key={category.name}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>{category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List component="nav">
                            {
                              props.subcategories.filter(function(subcategory) {
                                return subcategory.category === category._id;
                              }).map(function(subcategory) {
                                return (
                                  <ListItemLink key={subcategory.name} href={`/subcategory/${subcategory._id}`}>
                                    <ListItemText primary={subcategory.name} />
                                  </ListItemLink>
                                );
                              })
                            }
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                }
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              {props.children}
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </SnackbarProvider>
    </div>
  );
}
