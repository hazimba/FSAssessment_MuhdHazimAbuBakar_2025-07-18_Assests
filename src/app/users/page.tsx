"use client";
import PageWrapper from "@/components/pageWrapper";
import { useEffect, useMemo, useState } from "react";
import { fetchEntities } from "../services/fetchEntities";
import type { Courses, Users } from "@/types";
import { Table, Tag } from "antd";
import ActionButtons from "@/components/actionButton";

const Users = () => {
  const [data, setfetchEntities] = useState<Users[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [dataFilter, setDataFilter] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchEntities<Courses>({
      setfetchEntities: setCourses,
      entities: "courses",
    });
  }, []);

  console.log("Courses data:", courses);
  const onSuccess = () => {
    fetchEntities<Users>({
      setfetchEntities,
      setDataFilter,
      entities: "users",
    });
  };
  console.log("dataFilter", dataFilter);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dataFilter.slice(start, start + pageSize);
  }, [dataFilter, currentPage, pageSize]);

  console.log("Users data:", data);
  useEffect(() => {
    fetchEntities<Users>({
      setfetchEntities: setfetchEntities,
      setDataFilter,
      entities: "users",
    });
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
      title: "Role",
      key: "role",
      dataIndex: "role",
      sorter: (a: Users, b: Users) => a.role.localeCompare(b.role),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Users) => {
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ActionButtons
              record={record}
              fetchEntities={() =>
                fetchEntities<Users>({
                  setfetchEntities,
                  setDataFilter,
                  entities: "users",
                })
              }
              onSuccess={onSuccess}
            />
          </div>
        );
      },
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
        size="middle"
        pagination={{
          showSizeChanger: true,
          total: dataFilter.length,
          pageSizeOptions: ["10", "20", "30", "40"],
          showTotal: (total) => `Total ${total} items`,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          className: "w-full flex gap-1",
        }}
        dataSource={paginatedData}
        columns={columns}
        rowClassName={(record) =>
          record.status === "Inactive" ? "bg-red-100" : ""
        }
        onRow={(record) => ({
          onClick: () => {
            window.location.href = `/users/view/${record._id}`;
          },
        })}
        expandable={{
          expandedRowRender: (record: Users) => {
            const enrolledCourses = courses.filter((course) =>
              record.enrollment?.includes(course._id)
            );

            return (
              <div className="flex gap-1">
                Enrollment :
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map((course) => (
                    <Tag key={course._id} color="blue">
                      {course.title}
                    </Tag>
                  ))
                ) : (
                  <Tag color="red">None</Tag>
                )}
              </div>
            );
          },
        }}
      />
    </PageWrapper>
  );
};
export default Users;
