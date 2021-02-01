import React from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Auth from "./services/AuthService";

// Pages
import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";

/**
 * Garante rota privada ate pagina de User e Admin
 * @param {*} param0
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user = Auth.isLogged();
      if (!user) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }
      return <Component />;
    }}
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        
        <PrivateRoute path="/user" exact component={User}></PrivateRoute>
        <PrivateRoute path="/admin" exact component={Admin}></PrivateRoute>
        {/* 
          <Route exact path="/user" component={User} />
          <Route path="/admin" component={Admin} />  
        */}
      </Switch>
    </BrowserRouter>
  );
}
