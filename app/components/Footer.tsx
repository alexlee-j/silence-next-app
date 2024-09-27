import React from "react";

interface FooterType {
  className?: string;
}
const Footer: React.FC<FooterType> = ({ className }) => {
  const combinedClassName = `pt-[20px] pb-[10px] ${className}`;
  return (
    <footer className={combinedClassName}>
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
  );
};

export default Footer;
