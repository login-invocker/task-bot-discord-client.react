import React, { useContext } from "react";
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
import AnalyticsTaskPage from "../pages/analytics.Task-page"
import HomePage from "../pages/Home-page"
import WellCome from "../pages/well-come-page"
import {authContext} from '../App'
import VocabularyBuildingPage from '../pages/vocabulary-building/vocabulary-building-page'
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
    path: "/wellcome",
    component: WellCome,
    isPrivate: false
  },
  {
    path: "/home",
    component: HomePage,
    isPrivate: true
  },
  {
    path: "/login",
    component: LoginPage,
    isPrivate: false

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
    path: "/analytics-task",
    component: AnalyticsTaskPage,
    isPrivate: true
  },
  {
    path: "/register",
    component: RegisterPage,
    isPrivate: false
  },
  {
    path: "/vocabulary",
    component: VocabularyBuildingPage,
    isPrivate: true
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