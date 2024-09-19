type router = {
  slug: string;
  title: string;
  key: string;
  icon?: string;
  children?: router[];
};

const routers: router[] = [
  {
    key: "1",
    title: `首页`,
    slug: `/`,
  },
  {
    key: "2",
    title: `域名`,
    slug: "/domain",
  },
  {
    key: "3",
    title: `服务`,
    slug: `serve`,
  },
  {
    key: "4",
    title: `用户管理`,
    slug: `userManagement`,
  },
];

export default routers;
