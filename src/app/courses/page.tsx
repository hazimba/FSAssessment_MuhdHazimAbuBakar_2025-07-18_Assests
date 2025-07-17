"use client";
import { fetchCourses } from "@/app/services/fetchCourses";
import ActionButtons from "@/components/actionButton";
import PageWrapper from "@/components/pageWrapper";
import type { Courses } from "@/types";
import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import FilterBar from "./filterBar";

const Courses = () => {
  const [data, setFetchCourses] = useState<Courses[]>([]);
  const [dataFilter, setDataFilter] = useState<Courses[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dataFilter.slice(start, start + pageSize);
  }, [dataFilter, pageSize, currentPage]);

  useEffect(() => {
    fetchCourses({ setFetchCourses, setDataFilter });
  }, []);

  const onSuccess = () => {
    fetchCourses({ setFetchCourses, setDataFilter });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (price: Courses | any) => {
        const value = price?.$numberDecimal;
        return Number(value).toFixed(2);
      },
    },
    {
      title: "Instructor",
      dataIndex: "instructor_id",
      key: "instructor_id",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      // @ts-expect-error: Type 'Courses' is not assignable to type 'string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | ReactPortal | null | undefined'.
      render: (_, record: Courses) => (
        <ActionButtons
          record={record}
          fetchCourses={() => fetchCourses({ setFetchCourses, setDataFilter })}
          onSuccess={onSuccess}
        />
      ),
    },
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="my-4">This is the courses page.</p>
      <FilterBar
        data={data}
        setDataFilter={setDataFilter}
        setCurrentPage={setCurrentPage}
      />
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
            window.location.href = `/courses/view/${record._id}`;
          },
        })}
        expandable={{
          expandedRowRender: (record) => (
            <p className="m-0">{record.description}</p>
          ),
        }}
      />
    </PageWrapper>
  );
};
export default Courses;
