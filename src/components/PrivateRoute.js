import React from "react";
import { Route, Redirect } from "react-router";
import Cookies from "js-cookie";

function PrivateRoute(props) {
  // checking user token
  const token = Cookies.get("access");

  return token ? <Route {...props} /> : <Redirect to={{ pathname: "/" }} />;
}
export default PrivateRoute;
