"use client";
import ActionButtons from "@/components/actionButton";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import type { Courses } from "@/types";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Table } from "antd";
import axios from "axios";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

const Courses = () => {
  const [data, setData] = useState<Courses[]>([]);
  const [dataSource, setDataSource] = useState<Courses[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedInstructor, setSelectedInstructor] = useState<
    string | undefined
  >();
  const [searchText, setSearchText] = useState<string>("");

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [dataSource, pageSize, currentPage]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.course.getCourses
      );
      setData(response.data);
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
          fetchCourses={fetchCourses}
          onSuccess={onSuccess}
        />
      ),
    },
  ];

  const instuctorOptions = [
    { value: "664f1717c31e4c87fae88273", label: "Instructor 1" },
    { value: "664f1701ebd5c8b7f3ab71f4", label: "Instructor 2" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const applyFilters = (
    status: string | undefined,
    instructorId: string | undefined,
    search: string
  ) => {
    let filtered = [...data];

    if (status) {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (instructorId) {
      filtered = filtered.filter((item) => item.instructor_id === instructorId);
    }

    if (search) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(search) ||
          course.description.toLowerCase().includes(search)
      );
    }

    setDataSource(filtered);
  };

  return (
    <PageWrapper>
      {/* <div className="pt-12"></div> */}
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="my-4">This is the courses page.</p>
      <div className="flex gap-4">
        <div className="flex gap-4 mb-4">
          <Input.Search
            onChange={debounce((e) => {
              const value = e.target.value.toLowerCase();
              setSearchText(value);
              applyFilters(selectedStatus, selectedInstructor, value);
              setCurrentPage(1);
            }, 300)}
            prefix={<SearchOutlined />}
            placeholder="Title Filter..."
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Select
            options={instuctorOptions}
            onChange={(value) => {
              setSelectedInstructor(value);
              applyFilters(selectedStatus, value, searchText);
              setCurrentPage(1);
            }}
            allowClear
            placeholder="Instructor Filter..."
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Select
            options={statusOptions}
            onChange={(value) => {
              setSelectedStatus(value);
              applyFilters(value, selectedInstructor, searchText);
              setCurrentPage(1);
            }}
            allowClear
            placeholder="Status Filter..."
          />
        </div>
      </div>
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
          total: dataSource.length,
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
            <p className="m-0">{record.image_url}</p>
          ),
        }}
      />
    </PageWrapper>
  );
};
export default Courses;
