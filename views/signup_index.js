import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack"
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import DefaultLayout from "./layouts/default"
import PhoneMaskedInput from "./components/PhoneMaskedInput";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, PHONE_NUMBER_REGEX } from "../consts";

const PASSWORD_VALIDATION_MESSAGE = `Must contain ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters and at least 1 letter`;

const signupSchema = Yup.object().
  shape({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(/[^\d]/, PASSWORD_VALIDATION_MESSAGE)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_VALIDATION_MESSAGE)
      .max(PASSWORD_MAX_LENGTH, PASSWORD_VALIDATION_MESSAGE)
      .required("Required"),
    passwordConfirm: Yup.string()
      .matches(/[^\d]/, PASSWORD_VALIDATION_MESSAGE)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_VALIDATION_MESSAGE)
      .max(PASSWORD_MAX_LENGTH, PASSWORD_VALIDATION_MESSAGE)
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(PHONE_NUMBER_REGEX, "Invalid phone number. Please verify.")
      .required("Required"),
  });

export default function Signup(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [photo, setPhoto] = React.useState(null);

  const handlePhotoChange = function(ev) {
      if (!ev.target.files) {
        setPhoto({ file: null });
      } else {
        setPhoto({ file: ev.target.files[0] });
      }
  }

  return (
    <DefaultLayout {...props}>
      <Box maxWidth={500}>
        <Typography variant="h6" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            phoneNumber: "",
          }}
          validationSchema={signupSchema}
          onSubmit={function(values, { setSubmitting }) {
            const data = new FormData();

            Object.keys(values).forEach(function(key) {
              data.append(key, values[key]);
            });

            if (photo) {
              data.append("file", photo);
            }

            axios({
              method: "post",
              url: "/signup",
              headers: {'X-Requested-With': 'XMLHttpRequest'},
              data
            }).then(function() {
              window.location.href = "/";
              setSubmitting(false)
            }).catch(function(err) {
              enqueueSnackbar(err.message, { variant: "error" });
              setSubmitting(false)
            });
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name="username"
                type="text"
                label="Username"
              />
              <br />
              <br />
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Full name"
              />
              <br />
              <br />
              <Typography variant="body1" color="textSecondary">
                Profile photo
              </Typography>
              <br />
              <input type="file" onChange={handlePhotoChange} />
              <br />
              <br />
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />
              <br />
              <br />
              <Field
                component={TextField}
                name="phoneNumber"
                label="Phone number"
                InputProps={{
                  inputComponent: PhoneMaskedInput,
                }}
              />
              <br />
              <br />
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
              />
              <br />
              <br />
              <Field
                component={TextField}
                name="passwordConfirm"
                type="password"
                label="Confirm Password"
              />
              <br />
              <br />
              {isSubmitting && <LinearProgress />}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </DefaultLayout>
  );
}
