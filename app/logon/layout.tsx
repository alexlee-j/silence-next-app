import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Tab from "@/ui/tab";
import "@/app/globals.css";
import routers from "@/router";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const HeaderBar = dynamic(() => import("@/app/components/header"), {
  ssr: false,
});
import ClientProvider from "@/app/components/ClientProvider"; // 引入 ClientProvider
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "默默学开发",
    template: "%s | 默默学开发",
  },
  metadataBase: new URL("http://www.silencelee.cn"),
  description:
    "默默学开发是个人的开发学习网站，用于展示站主学习成果，本项目采用Next.js 13进行开发。",
  openGraph: {
    title: "默默学开发",
    description:
      "默默学开发是个人的开发学习网站，用于展示站主学习成果，本项目采用Next.js 13进行开发。",
    images: [`/api/og?title=Next.js App Router`],
  },
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <ClientProvider>
    <HeaderBar />

    <div id="root" className="flex-1 flex bg-white">
      <div className="w-[150px] bg-slate-800 text-white">
        <Tab tabData={routers}></Tab>
      </div>
      <div className="flex flex-col flex-1 px-5">
        <div className="flex-1 p-5 mt-[20px] border rounded border-slate-300">
          <AntdRegistry>{children}</AntdRegistry>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </ClientProvider>
);

export default RootLayout;
