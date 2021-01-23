import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
// import CreateUser from "./pages/CreateUser";
// import Admin from "./pages/Admin";
// import User from "./pages/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        {/* <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/admin/create" component={CreateUser} /> */}
      </Switch>
    </BrowserRouter>
  );
}
