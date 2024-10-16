import React from "react";
import { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "默默学开发",
    template: "%s | 默默学开发",
  },
  description:
    "默默学开发是个人的开发学习网站，用于展示站主学习成果，本项目采用Next.js 14进行开发。",
  metadataBase: new URL("http://www.silencelee.cn"),
  openGraph: {
    title: "默默学开发",
    description:
      "默默学开发是个人的开发学习网站，用于展示站主学习成果，本项目采用Next.js14进行开发。",
  },
};

const App = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default App;
