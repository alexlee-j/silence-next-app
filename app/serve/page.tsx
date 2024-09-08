import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Synopsis from "@/app/serve/components/synopsis";

export const metadata = {
  title: "服务页",
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "概要",
    children: <Synopsis />,
  },
  {
    key: "2",
    label: "容器管理",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "域名解析",
    children: "Content of Tab Pane 3",
  },
];

const Serves: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;

export default Serves;
