import React, { useState, Suspense, useMemo, useCallback } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Spin } from "antd";
import HeaderComp from "./components/Header";
import { useLoginStore } from "@stores/index";
import { routes } from "@config/router";
import NoAuthPage from "@components/NoAuthPage";
import type { AuthLoaderData, AppRouteObject } from "@/types";
import "antd/dist/reset.css";

const { Header, Content, Footer, Sider } = Layout;

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[];
}

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userInfo } = useLoginStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAdmin } = useLoaderData() as AuthLoaderData;

  const getItems = useCallback((children: AppRouteObject[]): MenuItem[] => {
    return children
      .filter((item) => item.path !== "*")
      .map((item) => {
        const key = item.index
          ? "/"
          : item.path?.startsWith("/")
          ? item.path
          : `/${item.path}`;

        return {
          key,
          icon: item.meta?.icon,
          label: item.meta?.title || "",
          children: item.children ? getItems(item.children) : undefined,
        };
      });
  }, []);

  const menuItems: MenuProps["items"] = useMemo(() => {
    const mainRoute = routes[0];
    if (!mainRoute?.children?.[0]?.children) return [];
    return getItems(mainRoute.children[0].children);
  }, [getItems]);

  const onMenuClick: MenuProps["onClick"] = useCallback((info: { key: string }) => {
    navigate(info.key);
  }, [navigate]);

  const renderOpenKeys = useCallback((): string[] => {
    const arr = pathname.split("/").slice(0, -1);
    const result = arr.map(
      (_, index) => "/" + arr.slice(1, index + 1).join("/")
    );
    return result.filter((key) => key !== "/");
  }, [pathname]);

  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }

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
            height: "calc(100vh - 128px)",
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
