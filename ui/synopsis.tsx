"use client";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { Col, Row, Flex, Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import echarts from "@/components/commonEcharts";
import debounce from "lodash/debounce";

const EchartsModel: React.FC = () => {
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
  }, [initChart]);

  return (
    <div
      id="main"
      ref={chartRef}
      style={{ height: "90%", width: "100%" }}
    ></div>
  );
};

type InformationData = {
  key: string;
  label: string;
  value?: string;
  icon?: React.ReactNode;
  popOverContent?: React.ReactNode;
};

const infomationData: InformationData[] = [
  {
    key: "1",
    label: "实例ID",
    value: (Math.random() * 1000).toString(),
  },
  {
    key: "2",
    label: "实例名称",
    value: "CentOS7.6-Docker26-XGsb",
  },
  {
    key: "3",
    label: "实例状态",
    value: "运行中",
  },
  {
    key: "4",
    label: "地域和可用区",
    value: "广州   |   广州七区",
  },
  {
    key: "5",
    label: "套餐类型",
    value: "新客专享型",
  },
  {
    key: "6",
    label: "实例规格",
    value: "CPU - 2核 内存 - 2GB<br />系统盘 - SSD云硬盘 40GB",
    icon: <QuestionCircleOutlined />,
    popOverContent: (
      <ul>
        <li>独享100%CPU；</li>
        <li>
          云硬盘采用多副本冗余机制对数据进行存储，提供99.9999999%的数据可靠性，支持使用快照进行备份；
        </li>
        <li>流量包仅对实例的出流量进行统计。</li>
      </ul>
    ),
  },
  {
    key: "7",
    label: "密钥",
    value: "暂未绑定",
  },
  {
    key: "8",
    label: "到期时间",
    value: "2030-01-01 00:00:00",
  },
];

const Information: React.FC = () => {
  const renderInformation = useMemo(() => {
    return infomationData.map((item) => (
      <Flex key={item.key} align="start" justify="center">
        <div className="pr-[20px] my-[6px] text-[#a8a8a8]">
          {item.label}
          {item.icon && (
            <Popover content={item.popOverContent} className="mw-[15vw]">
              <span>{item.icon}</span>
            </Popover>
          )}
        </div>
        <div
          className="flex-1 pt-[6px]"
          dangerouslySetInnerHTML={{ __html: item.value || "" }}
        ></div>
      </Flex>
    ));
  }, []);

  return (
    <div className="shadow-md m-2 box-border rounded-none text-xs p-5 h-auto w-[37vw] max-w-[475px] content-bg">
      <div className="title">实例信息</div>
      <div>{renderInformation}</div>
    </div>
  );
};

const Synopsis: React.FC = () => (
  <div className="w-full flex justify-center align-baseline flex-wrap">
    <div>
      <Information />
    </div>
    <div className="shadow-md m-2 box-border rounded-none text-xs p-5 h-auto w-[37vw] max-w-[475px] content-bg">
      <div className="title">实例监控</div>
      <EchartsModel />
    </div>
  </div>
);

export default Synopsis;
