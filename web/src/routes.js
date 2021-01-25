import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
// import CreateUser from "./pages/CreateUser";


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/user" component={User} />
        <Route path="/admin" component={Admin} />
        {/* 
        <Route path="/admin/create" component={CreateUser} /> */}
      </Switch>
    </BrowserRouter>
  );
}
