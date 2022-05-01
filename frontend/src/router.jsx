import { Fragment, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthGuard from "./components/functional/AuthGuard";
import GuestGuard from "./components/functional/GuestGuard";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<></>}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                <Guard>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Guard>
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/500",
    component: lazy(() => import("src/views/errors/500")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/404")),
  },
  {
    exact: true,
    path: "/home",
    component: lazy(() => import("src/views/home")),
  },
  {
    exact: true,
    path: "/hasura",
    component: lazy(() => import("src/views/hasura")),
  },
  {
    guard: GuestGuard,
    path: "/auth",
    routes: [
      {
        exact: true,
        path: "/auth/register",
        component: lazy(() => import("src/views/auth/RegisterView")),
      },
      {
        exact: true,
        path: "/auth/login",
        component: lazy(() => import("src/views/auth/LoginView")),
      },
    ],
  },
  {
    exact: true,
    guard: GuestGuard,
    path: "/auth/register",
    component: lazy(() => import("src/views/auth/RegisterView")),
  },
  {
    exact: true,
    guard: AuthGuard,
    path: "/account",
    component: lazy(() => import("src/views/account/AccountView")),
  },
  {
    path: "*",
    routes: [
      {
        exact: true,
        path: "/",
        component: () => <Redirect to="/home" />,
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
