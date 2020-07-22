import React from "react";
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import DefaultLayout from "./layouts/default"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(function(theme) {
  return {
    listRoot: {
      width: '100%',
      maxWidth: 560,
      backgroundColor: theme.palette.background.paper,
      maxHeight: 600,
      position: 'relative',
      overflow: 'auto',
    },
  };
});

export default function UsersIndex(props) {
  const classes = useStyles();

  return (
    <DefaultLayout {...props}>
      <Box display="flex" justifyContent="center">
        <List dense className={classes.listRoot}>
          {
            props.users.map(function(user) {
              return (
                <ListItem key={user.id} button>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" href={`/users/${user.id}`}>
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          }
        </List>
      </Box>
    </DefaultLayout>
  );
}
