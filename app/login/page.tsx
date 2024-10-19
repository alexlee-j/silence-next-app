"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import Footer from "@/app/components/Footer";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        // 自定义错误消息
        switch (result.error) {
          case "CredentialsSignin":
            message.error("用户名或密码错误，请重试");
            break;
          default:
            message.error("登录失败，请稍后重试");
        }
      } else {
        message.success("登录成功");
        router.push(result?.url || "/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("登录过程中发生错误，请稍后重试");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="py-12 px-12">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              欢迎回来
            </h2>
            <p className="text-center text-gray-600 mb-8">请登录您的账户</p>
            <LoginForm onFinish={onFinish} />
          </div>
          <div className="py-5 bg-gray-50">
            <p className="text-center text-gray-600">
              还没有账号？
              <Link
                href="/register"
                className="text-blue-600 hover:underline ml-1"
              >
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer className="bg-white py-4" />
    </div>
  );
};

export default LoginPage;
