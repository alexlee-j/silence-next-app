"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { isSequentialPassword } from "@/lib/utils/validate";
import { fetchData } from "@/lib/utils/request";
import Cryptpjs from "crypto-js";

type FieldType = {
  username: string;
  password: string;
  password1: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = async (
  values: FieldType
) => {
  console.log("Success:", values);
  const { username, password, password1 } = values;
  const resp = await fetchData("/api/register", {
    username,
    password: Cryptpjs.AES.encrypt(password, "123456").toString(),
    password1: Cryptpjs.AES.encrypt(password1, "123456").toString(),
  });
  console.log(resp, "resp");
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const RegisterForm: React.FC = () => {
  let [form] = Form.useForm();
  return (
    <div className="relative z-10 flex justify-center items-center">
      <div className="backdrop-blur-sm bg-white/50 w-full max-w-md p-10 rounded-lg shadow-md">
        <p className="mt-5 text-center text-black">注册账户</p>
        <div className="p-5">
          <Form
            form={form}
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
              rules={[
                {
                  validator: (_, username) => {
                    if (!username) {
                      return Promise.reject(
                        new Error(
                          "请输入用户名!用户名由数字、字母、下划线组成，用户名长度为5-16位"
                        )
                      );
                    } else if (
                      username?.length >= 5 &&
                      username?.length <= 16
                    ) {
                      if (username?.match(/^[a-zA-Z0-9_]+$/)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error("用户名由数字、字母、下划线组成")
                        );
                      }
                    } else {
                      return Promise.reject(new Error("用户名长度不能小于5"));
                    }
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[
                {
                  validator: (_, password) => {
                    if (!password) {
                      return Promise.reject(
                        new Error("请输入密码，密码长度为5-16位!")
                      );
                    } else if (
                      password?.length >= 5 &&
                      password?.length <= 16
                    ) {
                      // 密码不能是顺序数字

                      if (isSequentialPassword(password)) {
                        return Promise.reject(new Error("密码不能是顺序数字"));
                      } else {
                        return Promise.resolve();
                      }
                    } else {
                      return Promise.reject(new Error("密码长度不能小于5"));
                    }
                  },
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="确认密码"
              name="password1"
              rules={[
                {
                  validator: (_, password1) => {
                    if (!password1) {
                      return Promise.reject(new Error("请输入确认密码"));
                    } else if (password1 !== form.getFieldValue("password")) {
                      return Promise.reject(new Error("两次密码不一致"));
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
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
          <p className="text-center text-black">
            已有账号？
            <a className="text-blue-500" href="/login">
              去登录
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
