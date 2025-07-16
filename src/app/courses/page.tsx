"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
import apiEndpoints from "@/config/apiEndPoint";
import PageWrapper from "@/components/pageWrapper";

const Courses = () => {
  const [data, setDataSource] = useState<any>([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.getCourses
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
      render: (price: any) => {
        const value = price?.$numberDecimal;
        return Number(value).toFixed(2);
      },
    },
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="my-4">This is the courses page.</p>
      <Table
        rowKey="_id"
        bordered
        size="middle"
        dataSource={data}
        columns={columns}
      />
    </PageWrapper>
  );
};
export default Courses;
