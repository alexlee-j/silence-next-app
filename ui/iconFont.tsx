import React from "react";
import { useEffect } from "react";

/***
 * name: 去图标库查看
 * iconfont 字体图标封装。图标库：xxxx
 */
const IconFont: React.FC<{
  name: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
}> = ({ name, onClick, ...p }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/iconfont.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <svg
      className="w-5 h-5"
      {...p}
      fill="#fff"
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={"#icon-" + name} />
    </svg>
  );
};

export default IconFont;
