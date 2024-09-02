import React from "react";
import Link from "next/link";
import { Fragment } from "react";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <Fragment>
    这是我的首页啦
    <Link href="/domain">域名页面</Link>
  </Fragment>
);

export default RootLayout;
