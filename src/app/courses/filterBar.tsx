"use client";
import { Status, UserRole, type Courses, type Users } from "@/types";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import debounce from "lodash/debounce";
import { useState, useEffect } from "react";
import { fetchEntities } from "../services/fetchEntities";

interface FilterBarProps {
  data: Courses[];
  setDataFilter: (data: Courses[]) => void;
  setCurrentPage: (page: number) => void;
}

const FilterBar = ({ data, setDataFilter, setCurrentPage }: FilterBarProps) => {
  const [instructorOptions, setInstructor] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    fetchEntities<Users>({
      setfetchEntities: (data) => {
        const roleInstructor = data
          .filter((u) => u.role === UserRole.INSTRUCTOR)
          .map((u) => ({
            value: u._id,
            label: u.name,
          }));
        setInstructor(roleInstructor);
      },
      entities: "users?role=Instructor",
    });
  }, []);

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedInstructor, setSelectedInstructor] = useState<
    string | undefined
  >();
  const [searchText, setSearchText] = useState<string>("");

  const statusOptions = [
    { value: Status.ACTIVE, label: Status.ACTIVE },
    { value: Status.INACTIVE, label: Status.INACTIVE },
  ];

  const applyFilters = (
    status: string | undefined,
    instructorId: string | undefined,
    search: string,
    data: Courses[],
    setDataFilter: (data: Courses[]) => void
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

    setDataFilter(filtered);
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-4 mb-4">
        <Input.Search
          onChange={debounce((e) => {
            const value = e.target.value.toLowerCase();
            setSearchText(value);
            applyFilters(
              selectedStatus,
              selectedInstructor,
              value,
              data,
              setDataFilter
            );
            setCurrentPage(1);
          }, 300)}
          prefix={<SearchOutlined />}
          placeholder="Title Filter..."
        />
      </div>
      <div className="flex gap-4 mb-4">
        <Select
          options={instructorOptions}
          onChange={(value) => {
            setSelectedInstructor(value);
            applyFilters(
              selectedStatus,
              value,
              searchText,
              data,
              setDataFilter
            );
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
            applyFilters(
              value,
              selectedInstructor,
              searchText,
              data,
              setDataFilter
            );
            setCurrentPage(1);
          }}
          allowClear
          placeholder="Status Filter..."
        />
      </div>
    </div>
  );
};
export default FilterBar;
