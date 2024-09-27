"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  password1?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register: React.FC = () => (
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
    <div className="relative z-10 flex justify-center items-center">
      <div className="backdrop-blur-sm bg-white/50 w-full max-w-md p-10 rounded-lg shadow-md">
        <p className="mt-5 text-center text-black">注册账户</p>
        <div className="p-5">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="确认密码"
              name="password1"
              rules={[{ required: true, message: "请再次输入密码!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
          <p className="text-center text-black">
            已有账号？
            <a className="text-blue-500" href="/login">
              去登录
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Register;
