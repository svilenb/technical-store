import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefaultLayout from "./layouts/default"
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(function(theme) {
  return {
    breadcrumbs: {
      marginBottom: theme.spacing(3)
    },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  }
});

export default function Products(props) {
  const classes = useStyles();

  return (
    <DefaultLayout {...props}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        {
          !!props.subcategory ? (
            <Link color="inherit" href={`/category/${props.category.name}`}>
              {props.category.name}
            </Link>
          ) : (
            <Typography color="textPrimary">{props.category.name}</Typography>
          )
        }
        {
          !!props.subcategory && (
            <Typography color="textPrimary">{props.subcategory.name}</Typography>
          )
        }
      </Breadcrumbs>
      {
        !!props.products.length ? (
          <Grid container spacing={3}>
            {
              props.products.map(function(product) {
                return (
                  <Grid key={product.name} item xs={12} md={6}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={`/build${product.photos[0]}`}
                          title={product.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                          </Typography>
                          {
                            !!product.description && (
                              <Typography variant="body2" color="textSecondary" component="p">
                                {product.description}
                              </Typography>
                            )
                          }
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small" color="primary" href={`/products/${product._id}`}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
        ) : (
          <Typography variant="body1" gutterBottom>
            No Products...
          </Typography>
        )
      }
    </DefaultLayout>
  );
}
