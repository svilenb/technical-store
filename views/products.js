import React from 'react';
import DefaultLayout from "./layouts/default"

export default function Products(props) {
  console.log(" props >>>");
  console.log(props);
  return (
    <DefaultLayout {...props}>
      Categories
    </DefaultLayout>
  );
}
