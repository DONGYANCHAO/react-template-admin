import React, { useState, useEffect, useRef } from "react";
import { Line } from "@ant-design/plots";
import { Spin, Alert, message } from "antd";

interface LineDataItem {
  year: string;
  value: number;
  category: string;
}

const DemoLine: React.FC = () => {
  const [data, setData] = useState<LineDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
          { signal: abortControllerRef.current?.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: LineDataItem[] = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        const errorMessage =
          err instanceof Error ? err.message : "数据加载失败";
        setError(errorMessage);
        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    height: 300,
    yAxis: {
      label: {
        formatter: (v: string | number) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  if (loading) {
    return (
      <div
        style={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="数据加载失败"
        description={error}
        type="error"
        showIcon
        style={{ height: 300 }}
      />
    );
  }

  return <Line {...config} />;
};

export default DemoLine;
