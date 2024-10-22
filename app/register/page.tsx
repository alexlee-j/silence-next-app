"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import Link from "next/link";
import CryptoJS from "crypto-js";
import RegisterForm from "../components/RegisterForm";
import Footer from "@/app/components/Footer";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        values.password,
        "123456"
      ).toString();
      const encryptedPassword1 = CryptoJS.AES.encrypt(
        values.confirm,
        "123456"
      ).toString();

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: encryptedPassword,
          password1: encryptedPassword1,
        }),
      });

      if (response.ok) {
        message.success("注册成功");
        // 注册成功后静默登录
        const result = await signIn("credentials", {
          username: values.username,
          password: values.password, // 使用未加密的密码进行登录
          redirect: false,
        });

        if (result?.error) {
          message.error("自动登录失败，请手动登录");
          router.push("/login");
        } else {
          router.push("/dashboard");
        }
      } else {
        const data = await response.json();
        message.error(data.message || "注册失败，请稍后重试");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("注册过程中发生错误，请稍后重试");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="py-12 px-12">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              创建账户
            </h2>
            <p className="text-center text-gray-600 mb-8">
              请填写以下信息完成注册
            </p>
            <RegisterForm onFinish={onFinish} />
          </div>
          <div className="py-5 bg-gray-50">
            <p className="text-center text-gray-600">
              已有账号？
              <Link
                href="/login"
                className="text-blue-600 hover:underline ml-1"
              >
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer className="bg-white py-4" />
    </div>
  );
};

export default RegisterPage;
