import React from "react";
import { Space, Table } from "antd";
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
}
const UserInfoTable: React.FC<UserInfoTableProps> = ({
  dataSource,
  className,
}) => {
  return (
    <Table dataSource={dataSource} className={className} rowKey="id">
      <Column title="名字" dataIndex="name" key="name" />
      <Column title="邮箱" dataIndex="email" key="email" />
      <Column
        title="注册日期"
        dataIndex="formatted_date"
        key="formatted_date"
      />
    </Table>
  );
};

export default UserInfoTable;
