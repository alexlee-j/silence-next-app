import Link from "next/link";
type slugData = {
  slug: string;
  title?: string;
  description?: string;
  key: string;
};

const slug = ({ tabData }: { tabData: slugData[] }) => (
  <div>
    {tabData.map((item) => {
      return (
        <div
          className="flex flex-col leading-normal hover:bg-slate-300 hover:text-white"
          key={item.key}
        >
          <Link href={item.slug} className="pl-5">
            {item.title}
          </Link>
        </div>
      );
    })}
  </div>
);
export default slug;
