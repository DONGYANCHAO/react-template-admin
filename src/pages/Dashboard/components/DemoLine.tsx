import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { Alert, Spin } from "antd";

interface LineDataItem {
  year: string;
  value: number;
  category: string;
}

const DemoLine: React.FC = () => {
  const [foldLineData, setFoldLineData] = useState<LineDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const asyncFetch = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setFoldLineData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "数据加载失败，请稍后重试");
          console.error("fetch data failed", err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    asyncFetch();

    return () => {
      abortController.abort();
    };
  }, []);

  const formatNumber = (v: number): string => {
    return `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);
  };

  if (error) {
    return (
      <div
        style={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert
          message="数据加载失败"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

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
        <Spin size="large" tip="数据加载中..." />
      </div>
    );
  }

  const config = {
    data: foldLineData,
    xField: "year",
    yField: "value",
    seriesField: "category",
    height: 300,
    yAxis: {
      label: {
        formatter: formatNumber,
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  return <Line {...config} />;
};

export default DemoLine;
