import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import { isAuthenticated } from "./auth";

import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
// import CreateUser from "./pages/CreateUser";


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" exact component={Login} />
        {/* private route to user page */}
        <Route exact path="/user" component={User} />
        <Route path="/admin" component={Admin} />
        {/*<Route path="/admin/create" component={CreateUser} /> */}
      </Switch>
    </BrowserRouter>
  );
}
