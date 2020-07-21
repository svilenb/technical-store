import React from 'react';
import Container from '@material-ui/core/Container';
import { SnackbarProvider } from "notistack"
import AppBar from "../components/AppBar";
import Copyright from "../components/Copyright";

export default function DefaultLayout(props) {
  return (
    <div>
      <AppBar {...props} />
      <Container maxWidth="xl">
        {props.children}
        <Copyright />
      </Container>
    </div>
  );
}
