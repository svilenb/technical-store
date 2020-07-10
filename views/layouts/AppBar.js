import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as Yup from "yup"
import { Formik, Form, Field } from "formik"
import { InputBase } from 'formik-material-ui';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../../consts";
import { useSnackbar } from "notistack"
import _ from "lodash";
import axios from "axios";

const PASSWORD_VALIDATION_MESSAGE = `Must contain ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters and at least 1 letter`;

const loginSchema = Yup.object().
  shape({
    username: Yup.string().required("Required"),
    password: Yup.string()
    .matches(/[^\d]/, PASSWORD_VALIDATION_MESSAGE)
    .min(PASSWORD_MIN_LENGTH, PASSWORD_VALIDATION_MESSAGE)
    .max(PASSWORD_MAX_LENGTH, PASSWORD_VALIDATION_MESSAGE)
    .required("Required")
  });

const useStyles = makeStyles(function(theme) {
  return {
    appBarRoot: {
      marginBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    form: {
      display: "flex"
    },
    input: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: theme.spacing(1),
    }
  }
});

export default function AppBar(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = function(event) {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = function() {
    setAnchorEl(null);
  };

  const handleLogout = function() {
    axios({
      method: "post",
      url: "/logout",
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }).then(function() {
      window.location.reload(false); 
    }).catch(function(err) {
      enqueueSnackbar(err.message, { variant: "error" });
    });
  }

  return (
    <MuiAppBar className={classes.appBarRoot} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {props.title || "TechStore"}
        </Typography>
        {
          !!props.currentUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  axios({
                    method: "post",
                    url: "/login",
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    data: {
                      username: values.username,
                      password: values.password
                    }
                  }).then(function() {
                    window.location.reload(false); 
                    setSubmitting(false)
                  }).catch(function(err) {
                    enqueueSnackbar(err.message, { variant: "error" });
                    setSubmitting(false)
                  });
                }}
              >
                {function({ submitForm, isSubmitting }) {
                  return (
                    <Form className={classes.form}>
                      <div className={classes.input}>
                        <Field 
                          classes={{ root: classes.inputRoot, input: classes.inputInput }}
                          component={InputBase}
                          name="username"
                          type="username"
                          placeholder="Username"
                        />
                      </div>
                      <div className={classes.input}>
                        <Field 
                          classes={{ root: classes.inputRoot, input: classes.inputInput }}
                          component={InputBase}
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <Button 
                        color="inherit" 
                        disabled={isSubmitting}
                        onClick={function() {
                          submitForm().catch(reason => {
                            Object.keys(reason).forEach(function(key) {
                              enqueueSnackbar(
                                `${_.capitalize(key)}: ${_.capitalize(reason[key])}`, {
                                  variant: "error"
                                });
                            });
                          });
                        }}>
                        Login
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
              <Button color="inherit">
                Sign Up
              </Button>
            </>
          )
        }
      </Toolbar>
    </MuiAppBar>
  );
}
