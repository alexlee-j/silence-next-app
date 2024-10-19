import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface RegisterFormProps {
  onFinish: (values: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="register"
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
        rules={[
          { required: true, message: "请输入密码" },
          { min: 6, message: "密码长度不能少于6个字符" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="密码"
          className="rounded-md py-2"
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请确认密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="确认密码"
          className="rounded-md py-2"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-2 text-white font-semibold transition duration-300 ease-in-out"
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
