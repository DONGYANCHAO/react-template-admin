import React, { useState, Suspense } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { MenuProps } from "antd";
import { Layout, Menu, theme, Spin } from "antd";
import HeaderComp from "./components/Header";
import { useLoginStore, type AuthLoaderData } from "@stores/index";
import { routeComponents } from "@config/router";
import NoAuthPage from "@components/NoAuthPage";
import type { AppRouteObject } from "@config/routeTypes";
import "antd/dist/reset.css";

const { Header, Content, Footer, Sider } = Layout;

function hasPath(
  route: AppRouteObject
): route is AppRouteObject & { path: string } {
  return "path" in route && typeof route.path === "string";
}

function hasChildren(
  route: AppRouteObject
): route is AppRouteObject & { children: AppRouteObject[] } {
  return "children" in route && Array.isArray(route.children);
}

const getItems = (children: AppRouteObject[]): MenuProps["items"] => {
  return children
    .filter((item) => hasPath(item) && item.title)
    .map((item) => {
      const path = item.path as string;
      return {
        key: path,
        icon: item.icon,
        label: item.title,
        children: hasChildren(item) ? getItems(item.children) : undefined,
      };
    });
};

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userInfo = useLoginStore((state) => state.userInfo);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAdmin } = useLoaderData() as AuthLoaderData;

  const menuItems: MenuProps["items"] = getItems(routeComponents);

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  const renderOpenKeys = (): string[] => {
    const arr = pathname.split("/").slice(0, -1);
    return arr.map((_, index) => "/" + arr.slice(1, index + 1).join("/"));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: "0 10px", background: colorBgContainer }}>
          <HeaderComp />
        </Header>
        <Content
          style={{
            padding: 16,
            overflow: "auto",
            height: `calc(100vh - 128px)`,
          }}
        >
          {isAdmin ? (
            <Suspense fallback={<Spin size="large" className="content_spin" />}>
              <Outlet />
            </Suspense>
          ) : (
            <NoAuthPage />
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          react template admin ©2023 Created by Jade
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
