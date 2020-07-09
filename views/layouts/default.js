import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

const useStyles = makeStyles(function(theme) {
  return {
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title || "TechStore"}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
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
    </div>
  );
}
