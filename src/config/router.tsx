import React, { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Spin } from "antd";
import ErrorPage from "@components/ErrorPage";
import App, { authLoader } from "../App";
import { LoginPage } from "@pages/index";
import {
  DashboardOutlined,
  EditOutlined,
  TableOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";

export interface AppRouteObject extends Omit<RouteObject, "children"> {
  title?: string;
  icon?: React.ReactNode;
  children?: AppRouteObject[];
}

const withLazy = (
  Component: React.LazyExoticComponent<React.FC>
): React.ReactElement => (
  <Suspense fallback={<Spin size="large" className="globa_spin" />}>
    <Component />
  </Suspense>
);

const Dashboard = lazy(() => import("@pages/Dashboard"));
const FormPage = lazy(() => import("@pages/FormPage"));
const TablePage = lazy(() => import("@pages/TablePage"));
const AccountCenter = lazy(() => import("@pages/AccountPage/AccountCenter"));
const AccountSettings = lazy(
  () => import("@pages/AccountPage/AccountSettings")
);
const DetailPage = lazy(() => import("@pages/DetailPage"));

const routeConfig: AppRouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            title: "Dashboard",
            icon: <DashboardOutlined />,
            element: withLazy(Dashboard),
          },
          {
            path: "form",
            title: "表单页",
            icon: <EditOutlined />,
            element: withLazy(FormPage),
          },
          {
            path: "table",
            title: "列表页",
            icon: <TableOutlined />,
            element: withLazy(TablePage),
          },
          {
            path: "detail",
            title: "详情页",
            icon: <BarsOutlined />,
            element: withLazy(DetailPage),
          },
          {
            path: "account",
            title: "个人页",
            icon: <UserOutlined />,
            children: [
              {
                path: "/account/center",
                title: "个人中心",
                element: withLazy(AccountCenter),
              },
              {
                path: "/account/settings",
                title: "个人设置",
                element: withLazy(AccountSettings),
              },
            ],
          },
          {
            path: "*",
            element: <Navigate to="/" replace={true} />,
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

export const routes = routeConfig;

export default createBrowserRouter(routes);
