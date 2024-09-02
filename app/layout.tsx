"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Tab from "@/ui/tab";
import HeaderBar from "@/ui/header";
import "./globals.css";
import routers from "@/router";
// import { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/language";

// export const metadata: Metadata = {
//   title: {
//     default: "默默学开发",
//     template: "%s | 默默学开发",
//   },
//   metadataBase: new URL("http://www.silencelee.cn"),
//   description:
//     "默默学开发是个人的开发学习网站，用于展示站主学习成果，本项目采用Next.js 13进行开发。",
//   openGraph: {
//     title: "默默学开发",
//     description:
//       "默默学开发是个人的开发学习网站，用于展示站主学习成果，本项目采用Next.js 13进行开发。",
//     images: [`/api/og?title=Next.js App Router`],
//   },
// };

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Provider store={store}>
        <HeaderBar />
      </Provider>
      <div className="root flex bg-white">
        <div className="w-[150px] h-screen bg-slate-800 text-white">
          <Tab tabData={routers}></Tab>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-5 mt-[20px] border rounded border-slate-300">
            <AntdRegistry>{children}</AntdRegistry>
          </div>
          <footer className="pt-[20px] pb-[10px]">
            <p className="text-center text-xs text-slate-500">
              ©{new Date().getFullYear()}
              <a
                href="https://beian.miit.gov.cn/"
                style={{ color: "#495770" }}
                target="_blank"
              >
                湘ICP备20014625号-1
              </a>
            </p>
          </footer>
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
