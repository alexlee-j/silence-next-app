"use client";
import React, { useEffect, Fragment, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import type { FormProps } from "antd";
import UserInfoTable from "./components/table";

const { Option } = Select;

type FieldType = {
  name?: string;
  email?: string;
  sort: string;
};

type PaginationType = {
  current: number;
  pageSize: number;
  total?: number;
};

const queryUsersInfo = async (params: FieldType & PaginationType) => {
  const res = await fetch("/api/queryUsersInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return res.json();
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [tableParams, setTableParams] = useState<PaginationType>({
    current: 1,
    pageSize: 10, // 每页显示一条数据
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const resp = await queryUsersInfo({
      ...values,
      ...tableParams,
    });
    console.log(resp, "resp");
    setUserInfo(resp.userList);
    setTableParams({
      ...tableParams,
      total: resp.total,
    });
  };

  useEffect(() => {
    onFinish({ name: "", email: "", sort: "1" });
  }, [tableParams.current, tableParams.pageSize]);

  const handleTableChange = (pagination: any) => {
    setTableParams({
      ...tableParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <Fragment>
      <Form
        name="basic"
        layout="inline"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{ sort: "1" }}
      >
        <Form.Item<FieldType> label="用户名" name="name">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="邮箱" name="email">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="排序"
          name="sort"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="1">按名字升序</Option>
            <Option value="2">按名字降序</Option>
            <Option value="3">按邮箱升序</Option>
            <Option value="4">按邮箱降序</Option>
            <Option value="5">按时间升序</Option>
            <Option value="6">按时间降序</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <UserInfoTable
        className="mt-10"
        dataSource={userInfo}
        pagination={tableParams}
        onChange={handleTableChange}
      />
    </Fragment>
  );
};

export default App;
