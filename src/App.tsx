import React, { Suspense, lazy } from "react";
import { ConfigProvider, Spin } from "antd";
import { useGlobalStore, selectPrimaryColor } from "@stores/index";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";

dayjs.locale("zh-cn");

const BasicLayout = lazy(() => import("./layout"));

export interface AuthLoaderData {
  isAdmin: boolean;
}

export function authLoader(): AuthLoaderData {
  return { isAdmin: true };
}

const App: React.FC = () => {
  const primaryColor = useGlobalStore(selectPrimaryColor);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <Suspense fallback={<Spin size="large" className="globa_spin" />}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  );
};
export default App;
