"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
import apiEndpoints from "@/config/apiEndPoint";
import PageWrapper from "@/components/pageWrapper";
import { Courses } from "@/types";

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

  const ActionButtons = ({ record }: { record: Courses }) => {
    console.log("Record:", record);

    return (
      <div className="flex space-x-2">
        <button className="text-blue-500 hover:underline">Edit</button>
        <button className="text-red-500 hover:underline">Delete</button>
      </div>
    );
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
      render: (price: any) => {
        const value = price?.$numberDecimal;
        return Number(value).toFixed(2);
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Courses) => <ActionButtons record={record} />,
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
      />
    </PageWrapper>
  );
};
export default Courses;
