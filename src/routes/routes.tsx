import { Outlet, useRoutes } from "react-router-dom";
import { lazy } from "react";
import AuthOutlet from "../components/layouts/AuthOutlet";
import PublicOutlet from "../components/layouts/PublicOutlet";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const PageNotFound = lazy(() => import("../components/layouts/NotFound/PageNotFound"));

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const CryptoDetailPage = lazy(() => import('../pages/CryptoDetails/CryptoDetailPage'));
const Favorites = lazy(() => import('../pages/Favorites/Favorites'));

export default function AppRoutes() {

  const routes = useRoutes([
    {
      path: "/",
      element: <AuthOutlet />,
      children: [
        // {
        //   path: "",
        //   element: <HomePage />,
        // },
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        { path: "crypto/:id", element: <CryptoDetailPage /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },
    {
      path: "*",
      element: <PublicOutlet />,
      children: [
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return routes;
}
