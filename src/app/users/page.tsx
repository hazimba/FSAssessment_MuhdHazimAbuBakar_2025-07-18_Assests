"use client";
import PageWrapper from "@/components/pageWrapper";
import { useEffect, useState } from "react";
import { fetchEntities } from "../services/fetchEntities";
import type { Users } from "@/types";
import { Table } from "antd";

const Users = () => {
  const [data, setData] = useState<Users[]>();

  console.log("Users data:", data);
  useEffect(() => {
    fetchEntities<Users>({ setfetchEntities: setData, entities: "users" });
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: (a: Users, b: Users) => a.name.localeCompare(b.name),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      sorter: (a: Users, b: Users) => a.status.localeCompare(b.status),
    },
    {
      title: "Identification",
      key: "identification",
      dataIndex: "identification",
      sorter: (a: Users, b: Users) =>
        a.identification.localeCompare(b.identification),
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      sorter: (a: Users, b: Users) => a.role.localeCompare(b.role),
    },
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="my-4">This is the users page.</p>
      <Table
        rowKey="_id"
        bordered
        className="w-full min-h-[400px]"
        tableLayout="fixed"
        scroll={{
          x: "max-content",
          y: 400,
        }}
        dataSource={data}
        size="middle"
        // pagination={{
        //   showSizeChanger: true,
        //   total: dataFilter.length,
        //   pageSizeOptions: ["10", "20", "30", "40"],
        //   showTotal: (total) => `Total ${total} items`,
        //   onChange: (page, size) => {
        //     setCurrentPage(page);
        //     setPageSize(size);
        //   },
        //   className: "w-full flex gap-1",
        // }}
        // dataSource={paginatedData}
        columns={columns}
        // rowClassName={(record) =>
        //   record.status === "Inactive" ? "bg-red-100" : ""
        // }
        // onRow={(record) => ({
        //   onClick: () => {
        //     window.location.href = `/courses/view/${record._id}`;
        //   },
        // })}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <p className="m-0">{record.description}</p>
        //   ),
        // }}
      />
    </PageWrapper>
  );
};
export default Users;
