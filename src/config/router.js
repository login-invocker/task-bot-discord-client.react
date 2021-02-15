import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './router.css'
import LoginPage from "../pages/Login-page"
import CreateTask from "../pages/Create.Task-pages"
import TaskManager from "../pages/manager.task.pages"
import TimeManager from "../pages/ManagerTime-pages"
import RegisterPage from "../pages/Register-User.page"

import {authContext} from '../App'

function useAuth() {
  return useContext(authContext);
}
// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routes = [
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/create-task",
    component: CreateTask,
    isPrivate: true
  },
  {
    path: "/manager-task",
    component: TaskManager,
    isPrivate: true
  },{
    path: "/manager-time",
    component: TimeManager,
    isPrivate: true
  },
  {
    path: "/register",
    component: RegisterPage,
    isPrivate: false
  }

];

export default function RouteConfigExample() {
  return (
   
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
    
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  
  if(route.isPrivate){
    return (
      <PrivateRoute path={route.path} >
        <route.component />
        </PrivateRoute>
    )
  }else{
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}