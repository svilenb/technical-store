import React from 'react';
import Container from '@material-ui/core/Container';
import { SnackbarProvider } from "notistack"
import AppBar from "../components/AppBar";
import Copyright from "../components/Copyright";

export default function DefaultLayout(props) {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <AppBar {...props} />
        <Container maxWidth="xl">
          {props.children}
          <Copyright />
        </Container>
      </SnackbarProvider>
    </div>
  );
}
