"use client";
import React, { useEffect, Fragment, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import type { FormProps } from "antd";
import UserInfoTable from "./components/table";
import UserIndfoModal from "./components/userIndoModel";
import { debounce } from "lodash";
import { fetchData } from "@/lib/utils/request";

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

type ModalType = {
  name?: string;
  email?: string;
  id?: number;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const updateUserInfo = async (data: ModalType) => {
  const res = await fetch("/api/updateUsersInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      id: data.id,
    }),
  });
  if (!res.ok) {
    message.error(`${res.status}-${res.statusText}`);
  }
  return res.json();
};

const App: React.FC = () => {
  const [userInfoList, setUserInfoList] = useState([]);
  const [tableParams, setTableParams] = useState<PaginationType>({
    current: 1,
    pageSize: 10, // 每页显示 10 条数据
  });
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [searchForm] = Form.useForm();

  const openModal = () => {
    setUserInfoModalVisible(true);
    setUserInfo({});
  };
  const handleModify = async (data: any) => {
    setUserInfoModalVisible(true);
    setUserInfo(data);
  };
  // 查询用户信息的方法
  const fetchUserInfo = async (
    values: FieldType,
    pagination: PaginationType
  ) => {
    setLoading(true);
    const resp = await fetchData("/api/queryUsersInfo", {
      ...values,
      current: pagination.current, // 使用分页参数
      pageSize: pagination.pageSize,
    });
    setUserInfoList(resp.userList);
    setTableParams({
      ...pagination,
      total: resp.total, // 更新总条目数
    });
    setLoading(false);
  };
  const debouncedFetchUserInfo = debounce(fetchUserInfo, 500);

  // 点击查询时触发的事件
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // 点击查询时重置当前页为 1
    const newPagination = { ...tableParams, current: 1 };
    setTableParams(newPagination);
    debouncedFetchUserInfo(values, newPagination); // 调用 debouncedFetchUserInfo 进行数据查询
  };
  const handleSubmit = async (data: any) => {
    console.log(data, "data111");
    if (Object.keys(userInfo).length == 0) {
      let res = await fetchData("/api/insertUsersInfo", {
        name: data.name,
        email: data.email,
      });

      if (res) {
        message.success("添加成功");
        setUserInfoModalVisible(false);
        onFinish({
          name: searchForm.getFieldValue("name"),
          email: searchForm.getFieldValue("email"),
          sort: "1",
        });
      }
    } else {
      let updateResp = await updateUserInfo(data);
      if (updateResp) {
        message.success("修改成功");
        setUserInfoModalVisible(false);
        onFinish({
          name: searchForm.getFieldValue("name"),
          email: searchForm.getFieldValue("email"),
          sort: "1",
        });
      }
    }
  };
  const handleDelete = async (data: any) => {
    const { id } = data;
    const res = await fetchData("/api/deleteUsersInfo", {
      id,
    });

    if (res) {
      message.success("删除成功");
      searchForm.submit();
    }
  };

  // 分页切换时触发的事件
  const handleTableChange = (pagination: PaginationType) => {
    // 保持表单的查询条件，切换分页
    const formValues = searchForm.getFieldsValue();
    setTableParams(pagination); // 更新分页参数
    debouncedFetchUserInfo(formValues, pagination); // 使用分页参数和表单值进行查询
  };

  // 初始化页面加载时，触发查询，类似于 componentDidMount
  useEffect(() => {
    const formValues = searchForm.getFieldsValue();
    debouncedFetchUserInfo(formValues, tableParams);
  }, []);

  return (
    <Fragment>
      <Form
        form={searchForm}
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

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            查询
          </Button>
        </Form.Item>
      </Form>

      <p className="mt-8">
        <Button type="default" onClick={openModal}>
          新建
        </Button>
      </p>

      <UserInfoTable
        className="mt-10"
        dataSource={userInfoList}
        pagination={tableParams} // 传入分页参数
        onChange={handleTableChange} // 处理分页切换
        loading={loading}
        onModify={handleModify}
        onDelete={handleDelete}
      />

      <UserIndfoModal
        visible={userInfoModalVisible}
        onClose={() => setUserInfoModalVisible(false)}
        onSubmit={handleSubmit}
        userInfo={userInfo}
      />
    </Fragment>
  );
};

export default App;
