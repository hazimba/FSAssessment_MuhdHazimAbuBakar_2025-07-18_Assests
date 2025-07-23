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
      entities: "users",
    });
  }, []);

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    Status.ACTIVE
  );

  const [selectedInstructor, setSelectedInstructor] = useState<
    string | undefined
  >();
  const [searchText, setSearchText] = useState<string>("");

  const statusOptions = [
    { value: Status.ACTIVE, label: Status.ACTIVE },
    { value: Status.INACTIVE, label: Status.INACTIVE },
  ];

  const applyFilters = (
    data: Courses[],
    setDataFilter: (data: Courses[]) => void,
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
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(search)
      );
    }
    setDataFilter(filtered);
  };

  useEffect(() => {
    applyFilters(
      data,
      setDataFilter,
      selectedStatus,
      selectedInstructor,
      searchText
    );
  }, [selectedStatus, selectedInstructor, searchText, data, setDataFilter]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <Input.Search
        onChange={debounce((e) => {
          const value = e.target.value.toLowerCase();
          setSearchText(value);
          applyFilters(data, setDataFilter, selectedStatus, value, searchText);
          setCurrentPage(1);
        }, 300)}
        prefix={<SearchOutlined />}
        placeholder="Title Filter..."
      />
      <Select
        options={instructorOptions}
        onChange={(value) => {
          setSelectedInstructor(value);
          applyFilters(data, setDataFilter, selectedStatus, value, searchText);
          setCurrentPage(1);
        }}
        allowClear
        placeholder="Instructor Filter..."
      />
      <Select
        options={statusOptions}
        onChange={(value) => {
          setSelectedStatus(value);
          applyFilters(data, setDataFilter, selectedStatus, value, searchText);
          setCurrentPage(1);
        }}
        defaultValue={Status.ACTIVE}
        allowClear
        placeholder="Status Filter..."
      />
    </div>
  );
};
export default FilterBar;
