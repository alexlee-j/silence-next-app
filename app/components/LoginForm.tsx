import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";

interface LoginFormProps {
  onFinish: (values: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      layout="vertical"
      className="space-y-6"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="用户名"
          className="rounded-md py-2"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="密码"
          className="rounded-md py-2"
        />
      </Form.Item>
      <div className="flex items-center justify-between">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          忘记密码？
        </Link>
      </div>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-2 text-white font-semibold transition duration-300 ease-in-out"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
