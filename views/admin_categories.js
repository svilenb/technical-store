import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DefaultLayout from "./layouts/default"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { useSnackbar } from "notistack"

const useStyles = makeStyles(function(theme) {
  return {
    root: {
      width: "100%",
      maxWidth: 560,
      backgroundColor: theme.palette.background.paper,
    },
    subheader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2)
    }
  }
});

export default function AdminCategories(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = function(category) {
    return function() {
      axios({
        method: "patch",
        url: `/category/${category._id}`,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          active: !category.active
        }
      }).then(function() {
        window.location.reload(false);
      }).catch(function(err) {
        enqueueSnackbar(err.message, { variant: "error" });
      });
    }
  }

  return (
    <DefaultLayout {...props}>
      <List
        subheader={(
          <ListSubheader className={classes.subheader}>
            <span>Categories</span>
            <Button variant="outlined" color="primary" size="small">Add New</Button>
          </ListSubheader>
        )}
        className={classes.root}>
        {
          props.categories.map(function(category) {
            return (
              <ListItem key={category.name}>
                <ListItemIcon>
                  <Switch
                    edge="start"
                    onChange={handleToggle(category)}
                    checked={category.active}
                  />
                </ListItemIcon>
                <ListItemText primary={category.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" href={`/admin/categories/${category._id}`}>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        }
      </List>
    </DefaultLayout>
  );
}
