import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack"
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import DefaultLayout from "./layouts/default"
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const categorySchema = Yup.object().
  shape({
    name: Yup.string().required("Required")
  });

export default function AdminCreateCategory(props) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <DefaultLayout {...props}>
      <Box maxWidth={500}>
        <Typography variant="h6" gutterBottom>
          Create category
        </Typography>
        <Formik
          initialValues={{
            name: ""
          }}
          validationSchema={categorySchema}
          onSubmit={function(values, { setSubmitting }) {
            axios({
              method: "post",
              url: "/category/create",
              headers: {'X-Requested-With': 'XMLHttpRequest'},
              data: values
            }).then(function() {
              window.location.reload(false);
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
                name="name"
                type="text"
                label="Name"
              />
              <br />
              {isSubmitting && <LinearProgress />}
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
