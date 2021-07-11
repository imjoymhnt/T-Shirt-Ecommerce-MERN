import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashboard from ".//user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
