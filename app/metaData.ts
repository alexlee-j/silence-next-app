// app/metadata.ts
import { Metadata } from "next";

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
