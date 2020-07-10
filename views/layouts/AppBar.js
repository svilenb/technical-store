import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as Yup from "yup"
import { Formik, Form, Field } from "formik"
import { InputBase } from 'formik-material-ui';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../../consts";
import { useSnackbar } from "notistack"
import _ from "lodash";

const PASSWORD_VALIDATION_MESSAGE = `Must contain ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters and at least 1 letter`;

const loginSchema = Yup.object().
  shape({
    email: Yup.string().email("Invalid email").required("Required"),
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

  return (
    <MuiAppBar className={classes.appBarRoot} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {props.title || "TechStore"}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(' on submit >>>', values);
          }}
        >
          {function({ submitForm, isSubmitting }) {
            return (
              <Form className={classes.form}>
                <div className={classes.input}>
                  <Field 
                    classes={{ root: classes.inputRoot, input: classes.inputInput }}
                    component={InputBase}
                    name="email" 
                    type="email"
                    placeholder="Email" 
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
      </Toolbar>
    </MuiAppBar>
  );
}
