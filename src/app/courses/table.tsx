import ActionButtons from "@/components/actionButton";
import { Courses, Users } from "@/types";
import { fetchEntities } from "../services/fetchEntities";
import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";

interface CoursesTableProps {
  dataFilter: Courses[];
  setfetchEntities: (data: Courses[]) => void;
  setDataFilter: (data: Courses[]) => void;
  onSuccess: () => void;
  currentPage?: number;
  setCurrentPage: (page: number) => void;
}

const CoursesTable = ({
  dataFilter,
  setfetchEntities,
  setDataFilter,
  onSuccess,
  currentPage = 1,
  setCurrentPage,
}: CoursesTableProps) => {
  const [pageSize, setPageSize] = useState(10);
  const [instructorOptions, setInstructor] = useState<
    { value: string; label: string }[]
  >([]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dataFilter.slice(start, start + pageSize);
  }, [dataFilter, pageSize, currentPage]);

  useEffect(() => {
    fetchEntities<Courses>({
      setfetchEntities,
      setDataFilter,
      entities: "courses",
    });
  }, [setfetchEntities, setDataFilter]);

  useEffect(() => {
    fetchEntities<Users>({
      setfetchEntities: (data) => {
        const roleInstructor = data
          .filter((u) => u.role === "Instructor")
          .map((u) => ({
            value: u._id,
            label: u.name,
          }));
        setInstructor(roleInstructor);
      },
      entities: "users?role=Instructor",
    });
  }, []);

  const columns = [
    // {
    //   title: "No",
    //   dataIndex: "index",
    //   key: "index",
    //   //   eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   render: (_: any, __: any, index: number) => (
    //     <span>{(currentPage - 1) * pageSize + index + 1}</span>
    //   ),
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Courses, b: Courses) => a.title.localeCompare(b.title),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: Courses, b: Courses) => a.status.localeCompare(b.status),
    },
    {
      title: "Price (RM)",
      dataIndex: "price",
      key: "price",
      sorter: (a: Courses, b: Courses) =>
        parseFloat(a.price.$numberDecimal) - parseFloat(b.price.$numberDecimal),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (price: Courses | any) => {
        const value = price?.$numberDecimal;
        return <div className="w-20">{Number(value).toFixed(2)}</div>;
      },
    },
    {
      title: "Instructor",
      dataIndex: "instructor_id",
      key: "instructor_id",
      render: (instructorId: string) => {
        const instructor = instructorOptions.find(
          (instructor) => instructor.value === instructorId
        );
        return instructor ? instructor.label : "";
      },
      sorter: (a: Courses, b: Courses) =>
        a.instructor_id.localeCompare(b.instructor_id),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Courses) => {
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ActionButtons
              record={record}
              fetchEntities={() =>
                fetchEntities<Courses>({
                  setfetchEntities,
                  setDataFilter,
                  entities: "courses",
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
  );
};
export default CoursesTable;
