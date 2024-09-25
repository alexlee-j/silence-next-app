"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";

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
  // bg-register-bg
  <div className="w-full h-full  bg-center bg-contain bg-no-repeat">
    <img
      className="w-screen h-screen object-fill"
      src="/images/login_bg.webp"
      alt=""
    />
    <div className="fixed inset-x-0 inset-y-0 flex justify-center items-center h-full">
      <div className="p-10 flex flex-col justify-center align-middle">
        <div className="backdrop-blur-sm bg-white/50 w-full max-w-md rounded-lg shadow-md">
          <p className="mt-5 text-center text-black">注册账户</p>
          <div className="p-5">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="确认密码"
                name="password1"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Register;
