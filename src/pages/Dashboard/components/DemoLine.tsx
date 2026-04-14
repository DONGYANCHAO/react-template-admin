import React, { useState, useEffect, useCallback } from "react";
import { Line } from "@ant-design/plots";
import { Spin, Alert } from "antd";
import type { LineChartData } from "@/types";

interface DemoLineProps {
  dataUrl?: string;
}

const DemoLine: React.FC<DemoLineProps> = ({
  dataUrl = "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
}) => {
  const [foldLineData, setFoldLineData] = useState<LineChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(dataUrl, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: LineChartData[] = await response.json();
      setFoldLineData(json);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "获取数据失败");
      }
    } finally {
      setLoading(false);
    }
  }, [dataUrl]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetchData(signal);

    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  const config = {
    data: foldLineData,
    xField: "year" as const,
    yField: "value" as const,
    seriesField: "category" as const,
    height: 300,
    yAxis: {
      label: {
        formatter: (v: string | number): string =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  if (loading) {
    return (
      <div style={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        style={{ margin: "20px 0" }}
      />
    );
  }

  return <Line {...config} />;
};

export default DemoLine;
