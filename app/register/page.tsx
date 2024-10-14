import React from "react";
import dynamic from "next/dynamic";
const RegisterForm = dynamic(() => import("./components/registerForm"), {
  ssr: false,
});
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "注册页",
};

const Register: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen">
      {/* 背景图片 */}
      <div className="absolute inset-0 w-full h-full">
        <img
          className="w-full h-full object-fill"
          src="/images/login_bg.webp"
          alt="background"
        />
      </div>

      {/* 表单内容 */}
      <RegisterForm></RegisterForm>
      <Footer className="fixed inset-x-0 bottom-0 w-screen bg-white/80" />
    </div>
  );
};

export default Register;
