import React, { lazy } from "react";
import {
  Navigate,
  createBrowserRouter,
  type RouteObject,
} from "react-router-dom";
import {
  DashboardOutlined,
  EditOutlined,
  TableOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ErrorPage from "@components/ErrorPage";
import type { AppRouteObject } from "./routeTypes";
import { authLoader } from "../App";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const FormPage = lazy(() => import("../pages/FormPage"));
const TablePage = lazy(() => import("../pages/TablePage"));
const AccountCenter = lazy(() => import("../pages/AccountPage/AccountCenter"));
const AccountSettings = lazy(
  () => import("../pages/AccountPage/AccountSettings")
);
const DetailPage = lazy(() => import("../pages/DetailPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

export const routeComponents: AppRouteObject[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: <DashboardOutlined />,
    element: <Dashboard />,
  },
  {
    path: "/form",
    title: "表单页",
    icon: <EditOutlined />,
    element: <FormPage />,
  },
  {
    path: "/table",
    title: "列表页",
    icon: <TableOutlined />,
    element: <TablePage />,
  },
  {
    path: "/detail",
    title: "详情页",
    icon: <BarsOutlined />,
    element: <DetailPage />,
  },
  {
    path: "/account",
    title: "个人页",
    icon: <UserOutlined />,
    children: [
      {
        path: "/account/center",
        title: "个人中心",
        element: <AccountCenter />,
      } as AppRouteObject,
      {
        path: "/account/settings",
        title: "个人设置",
        element: <AccountSettings />,
      } as AppRouteObject,
    ],
  },
];

const AppLayout = lazy(() => import("../App"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    loader: authLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          ...(routeComponents as RouteObject[]),
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export { routes };
export default createBrowserRouter(routes);
