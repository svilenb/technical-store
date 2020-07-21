import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import DefaultLayout from "./layouts/default"
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(function(theme) {
  return {
    mainPhoto: {
      width: "100%"
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    listRoot: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  };
});

export default function ProductsView(props) {
  const classes = useStyles();
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const handleTileClick = function(photoIndex) {
    return function() {
      setPhotoIndex(photoIndex);
    }
  }

  return (
    <DefaultLayout {...props}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img className={classes.mainPhoto} src={`/build/${props.product.photos[photoIndex]}`} alt={props.product.name} />
          <GridList className={classes.gridList} cols={2.5}>
            {props.product.photos.map(function(photo, index) {
              return (
                <GridListTile key={index} onClick={handleTileClick(index)}>
                  <img src={`/build/${photo}`} />
                </GridListTile>
              )
            })}
          </GridList>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box my={6}>
            <Typography variant="h6" gutterBottom>
              {props.product.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Model: {props.product.model}
            </Typography>
            {
              !!props.product.description && (
                <Typography variant="body1" gutterBottom>
                  Description: {props.product.description}
                </Typography>
              )
            }
            <Typography variant="body1" gutterBottom>
              Price: {props.product.price} BGN
            </Typography>
            <Typography variant="body1" gutterBottom>
              Brand: {props.product.brand.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: {props.product.category.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Subcategory: {props.product.subcategory.name}
            </Typography>
            {
              !!props.product.comments.length && (
                <div className={classes.listRoot}>
                  <List
                    component="ul"
                    subheader={
                      <ListSubheader component="div">
                        Comments
                      </ListSubheader>
                    }
                  >
                    {
                      props.product.comments.map(function(comment, index) {
                        return (
                          <ListItem key={index}>
                            <ListItemText primary={comment} />
                          </ListItem>
                        );
                      })
                    }
                  </List>
                </div>
              )
            }
          </Box>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
