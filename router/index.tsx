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
    title: `Tab 1`,
    slug: "/domain",
  },
  {
    key: "2",
    title: `Tab 2`,
    slug: `serve`,
  },
  {
    key: "3",
    title: `Tab 3`,
    slug: `/`,
  },
];

export default routers;
