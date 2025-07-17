"use client";
import type { Courses } from "@/types";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import debounce from "lodash/debounce";
import { useState } from "react";

interface FilterBarProps {
  data: Courses[];
  setDataFilter: (data: Courses[]) => void;
  setCurrentPage: (page: number) => void;
}

const FilterBar = ({ data, setDataFilter, setCurrentPage }: FilterBarProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedInstructor, setSelectedInstructor] = useState<
    string | undefined
  >();
  const [searchText, setSearchText] = useState<string>("");
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
          options={instuctorOptions}
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
