// app/api/infomationData/route.ts
import { NextResponse } from "next/server";

type InformationData = {
  key: string;
  label: string;
  value?: string;
  needIcon?: boolean;
  popOverContent?: string;
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
    needIcon: true,
    popOverContent: `
      <ul>
        <li>独享100%CPU；</li>
        <li>云硬盘采用多副本冗余机制对数据进行存储，提供99.9999999%的数据可靠性，支持使用快照进行备份；</li>
        <li>流量包仅对实例的出流量进行统计。</li>
      </ul>
    `,
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

export async function GET() {
  return NextResponse.json(infomationData);
}
