import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import type { TableProps } from "antd";

const { Column } = Table;

interface UserInfoType {
  id: number;
  name: string;
  email: string;
  formatted_date: string;
}

interface UserInfoTableProps extends TableProps<UserInfoType> {
  className?: string;
  onModify?: (record: UserInfoTableProps) => void;
  onDelete?: (record: UserInfoTableProps) => void;
  loading?: boolean;
  onChange?: (pagination: any) => void;
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({
  dataSource,
  className,
  pagination,
  onChange,
  loading,
  onModify,
  onDelete,
}) => {
  return (
    <Table
      dataSource={dataSource}
      className={className}
      rowKey="id"
      pagination={pagination}
      onChange={onChange}
      loading={loading}
    >
      <Column title="名字" dataIndex="name" key="name" />
      <Column title="邮箱" dataIndex="email" key="email" />
      <Column
        title="注册日期"
        dataIndex="formatted_date"
        key="formatted_date"
      />
      <Column
        title="Action"
        key="action"
        render={(_: any, record) => (
          <Space size="middle">
            <a href="#" onClick={() => onModify && onModify(record)}>
              修改
            </a>
            <Popconfirm
              placement="topRight"
              title="确定删除该用户吗？"
              onConfirm={() => onDelete && onDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserInfoTable;
