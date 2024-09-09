"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Col, Row, Flex, Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import echarts from "@/components/commonEcharts";
import debounce from "lodash/debounce";
import { InformationData, monitorChartType } from "@/types/synopsis";

const EchartsModel: React.FC<{ height: number; data: monitorChartType }> = ({
  height,
  data,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const initChart = useCallback(() => {
    const initOptions: echarts.EChartsCoreOption = {
      grid: {
        left: "10%",
        right: "10%",
        top: "10%",
        bottom: "10%",
      },
      xAxis: {
        type: "category",
        data: data.xAxisArr,
      },
      yAxis: {
        type: "value",
        min: 500,
        max: 1000,
      },
      series: [
        {
          data: data.seriesArr,
          type: "line",
          smooth: true,
        },
      ],
    };
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(initOptions);
      chartInstance.current = myChart;
    }
  }, [data]);

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
  const [monitorData, setMonitorData] = useState<monitorChartType | null>(null);
  const [infoHeight, setInfoHeight] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const [infoResponse, monitorResponse] = await Promise.all([
        fetch("/api/infomationData"),
        fetch("/api/monitorData"),
      ]);
      const infoData: InformationData[] = await infoResponse.json();
      const monitorData: monitorChartType = await monitorResponse.json();
      setInfomationData(infoData);
      setMonitorData(monitorData);
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
        {monitorData && <EchartsModel height={infoHeight} data={monitorData} />}
      </div>
    </div>
  );
};

export default Synopsis;
