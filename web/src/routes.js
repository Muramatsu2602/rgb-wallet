import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {isAuthenticated} from './auth'
import Login from "./pages/Login";
import User from "./pages/User";
// import CreateUser from "./pages/CreateUser";
// import Admin from "./pages/Admin";

const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route 
  {...rest} 
  render = {props => 
    isAuthenticated() ? (
      <Component { ... props} />
    ) : (
      <Redirect to = {{pathname: '/', state : {from: props.location}}}/> 
    )
    
  }/>

)

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" exact component={Login} />
        //private route to user
        <PrivateRoute exact path="/user" component={User} /> 

        {/* <Route path="/admin" component={Admin} />
        <Route path="/admin/create" component={CreateUser} /> */}
      </Switch>
    </BrowserRouter>
  );
}
