"use client";
import ActionButtons from "@/components/actionButton";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import type { Courses } from "@/types";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Courses = () => {
  const [data, setDataSource] = useState<Courses[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.course.getCourses
      );
      console.log(response.data);
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onSuccess = () => {
    fetchCourses();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (price: Courses | any) => {
        const value = price?.$numberDecimal;
        return Number(value).toFixed(2);
      },
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, record: Courses) => (
        <ActionButtons
          record={record}
          fetchCourses={fetchCourses}
          onSuccess={onSuccess}
        />
      ),
    },
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="my-4">This is the courses page.</p>
      <Table
        rowKey="_id"
        bordered
        className="w-full"
        size="middle"
        dataSource={data}
        columns={columns}
        rowClassName={(record) =>
          record.status === "Inactive" ? "bg-red-100" : ""
        }
      />
    </PageWrapper>
  );
};
export default Courses;
