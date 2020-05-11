import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedLoginRoute from "components/ProtectedLoginRoute";
import { redirectTo } from "constants/index";
import { UserContext } from "components/UserContext";
import HomePage from "Routes/HomePage";
import SignupPage from "Routes/SignupPage";
import SearchPage from "Routes/SearchPage";
import StatsPage from "Routes/StatsPage";
import Login from "Routes/Login";
import Header from "components/Header";
import StudyPage from "Routes/StudyPage";

// Routes Array
const routes = (isAuthenticated) => [
  {
    name: "Home",
    sidebar: true,
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    name: "Study",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/study",
    exact: true,
    main: () => <StudyPage />,
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Search",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/search",
    exact: true,
    main: () => <SearchPage />,
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Login",
    sidebar: !isAuthenticated,
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
  {
    name: "Sign Up",
    sidebar: !isAuthenticated,
    path: "/signup",
    exact: true,
    main: () => <SignupPage />,
  },
  {
    name: "Stats",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/stats",
    exact: true,
    main: () => "Stats Success",
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Account",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/account",
    exact: true,
    main: () => "Account Success",
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    path: "/*",
    exact: true,
    main: () => <SignupPage />,
  },
];

// all routes go here
const Routes = () => {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = user;

  const _routes = routes(isAuthenticated);

  // TODO: should return loading or something while the user is setup
  if (!user.isUserReady) return "";
  return (
    <Router>
      <Header _routes={_routes} />
      <Switch>
        {_routes.map((route, index) =>
          route.protectedRoute ? (
            <ProtectedLoginRoute
              children={route.main}
              exact={route.exact}
              isAuthenticated={route.isAuthenticated}
              path={route.path}
            />
          ) : (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                children={route.main}
              />
            )
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
