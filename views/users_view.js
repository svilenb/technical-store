import React from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from "notistack"
import DefaultLayout from "./layouts/default";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(function(theme) {
  return {
    avatar: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    }
  };
});
export default function UsersView(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleAddFriendClick = function() {
    axios({
      method: "post",
      url: `/users/${props.user._id}/friend`,
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).then(function() {
      window.location.reload(false);
    }).catch(function(err) {
      enqueueSnackbar(err.message, { variant: "error" });
    });
  }

  return (
    <DefaultLayout {...props}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Avatar src={`/build/${props.user.photo}`} className={classes.avatar} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h6" gutterBottom>
            {props.user.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {props.user.email}
          </Typography>
          {
            !!props.user.phoneNumber && (
              <Typography variant="body1" gutterBottom>
                Phone: {props.user.phoneNumber}
              </Typography>
            )
          }
          {
            !!props.currentUser && props.currentUser._id !== props.user._id && (
              <Button variant="contained" color="secondary" onClick={handleAddFriendClick}>
                Add friend
              </Button>
            )
          }
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
