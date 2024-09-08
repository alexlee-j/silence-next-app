// app/synopsis/page.tsx
"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Col, Row, Flex, Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import echarts from "@/components/commonEcharts";
import debounce from "lodash/debounce";

type InformationData = {
  key: string;
  label: string;
  value?: string;
  needIcon?: boolean;
  popOverContent?: string;
};

const EchartsModel: React.FC<{ height: number }> = ({ height }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const initChart = useCallback(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const options: echarts.EChartsCoreOption = {
        grid: {
          left: "10%",
          right: "10%",
          top: "10%",
          bottom: "10%",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          min: 500,
          max: 1000,
        },
        series: [
          {
            data: [820, 932, 901, 934, 701, 903, 609],
            type: "line",
            smooth: true,
          },
        ],
      };

      myChart.setOption(options);
      chartInstance.current = myChart;
    }
  }, []);

  useEffect(() => {
    initChart();

    const handleResize = debounce(() => {
      chartInstance.current?.resize();
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      chartInstance.current?.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [initChart, height]);

  return (
    <div
      id="main"
      ref={chartRef}
      style={{ height: "90%", width: "100%" }}
    ></div>
  );
};

const Information: React.FC<{
  data: InformationData[];
  onHeightChange: (height: number) => void;
}> = ({ data, onHeightChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      onHeightChange(containerRef.current.clientHeight);
    }
  }, [data, onHeightChange]);

  const renderInformation = useMemo(() => {
    return data.map((item) => (
      <Flex key={item.key} align="start" justify="center">
        <div className="pr-[20px] my-[6px] text-[#a8a8a8]">
          {item.label}
          {item.needIcon && (
            <Popover
              content={
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.popOverContent || "",
                  }}
                />
              }
              className="mw-[15vw]"
            >
              <span>
                <QuestionCircleOutlined />
              </span>
            </Popover>
          )}
        </div>
        <div
          className="flex-1 pt-[6px]"
          dangerouslySetInnerHTML={{ __html: item.value || "" }}
        ></div>
      </Flex>
    ));
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="shadow-md m-2 box-border rounded-none text-xs p-5 h-auto w-[37vw] max-w-[475px] content-bg"
    >
      <div className="title">实例信息</div>
      <div>{renderInformation}</div>
    </div>
  );
};

const Synopsis: React.FC = () => {
  const [infomationData, setInfomationData] = useState<InformationData[]>([]);
  const [infoHeight, setInfoHeight] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/infomationData");
      const data: InformationData[] = await response.json();
      setInfomationData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center align-baseline flex-wrap">
      <div>
        <Information data={infomationData} onHeightChange={setInfoHeight} />
      </div>
      <div className="shadow-md m-2 box-border rounded-none text-xs p-5 h-auto w-[37vw] max-w-[475px] content-bg">
        <div className="title">实例监控</div>
        <EchartsModel height={infoHeight} />
      </div>
    </div>
  );
};

export default Synopsis;
