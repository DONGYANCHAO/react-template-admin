import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import {
  DashboardOutlined,
  EditOutlined,
  TableOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ErrorPage from "@components/ErrorPage";
import LoginPage from "@pages/Login";
import App, { authLoader } from "../App";
import type { AppRouteObject } from "@/types";

const Dashboard = lazy(() => import("@pages/Dashboard"));
const FormPage = lazy(() => import("@pages/FormPage"));
const TablePage = lazy(() => import("@pages/TablePage"));
const AccountCenter = lazy(() => import("@pages/AccountPage/AccountCenter"));
const AccountSettings = lazy(() => import("@pages/AccountPage/AccountSettings"));
const DetailPage = lazy(() => import("@pages/DetailPage"));

const lazyWrapper = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

export const routes: AppRouteObject[] = [
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
            element: lazyWrapper(Dashboard),
            meta: { title: "Dashboard", icon: <DashboardOutlined /> },
          },
          {
            path: "form",
            element: lazyWrapper(FormPage),
            meta: { title: "表单页", icon: <EditOutlined /> },
          },
          {
            path: "table",
            element: lazyWrapper(TablePage),
            meta: { title: "列表页", icon: <TableOutlined /> },
          },
          {
            path: "detail",
            element: lazyWrapper(DetailPage),
            meta: { title: "详情页", icon: <BarsOutlined /> },
          },
          {
            path: "account",
            meta: { title: "个人页", icon: <UserOutlined /> },
            children: [
              {
                path: "/account/center",
                element: lazyWrapper(AccountCenter),
                meta: { title: "个人中心" },
              },
              {
                path: "/account/settings",
                element: lazyWrapper(AccountSettings),
                meta: { title: "个人设置" },
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

export default createBrowserRouter(routes as RouteObject[]);
