import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";

type ModalType = {
  name?: string;
  email?: string;
  user_id?: string;
};
const UserIndfoModal = ({
  visible,
  onClose,
  onSubmit,
  userInfo,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void; // 允许传递表单数据
  userInfo: ModalType;
}) => {
  let [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      form.setFieldsValue(userInfo); // 填充表单数据
    } else {
      form.resetFields(); // 重置表单
    }
  }, [visible, form, userInfo]);

  // 表单提交逻辑
  const handleSubmit = () => {
    form
      .validateFields() // 验证表单字段
      .then((values) => {
        // 提交数据
        let data = {
          ...values,
        };
        if (Object.keys(userInfo).length > 0) {
          data.user_id = userInfo.user_id;
        }
        onSubmit(data); // 将表单数据传递给父组件或执行提交操作
      })
      .catch((info) => {
        message.error("请检查输入内容"); // 处理错误情况
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={Object.keys(userInfo).length === 0 ? "新增" : "修改"}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确定
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              validator: (_, email) => {
                if (!email) {
                  return Promise.reject(new Error("请输入邮箱"));
                }
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email)
                  ? Promise.resolve()
                  : Promise.reject(new Error("请输入正确格式的邮箱"));
              },
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserIndfoModal;
