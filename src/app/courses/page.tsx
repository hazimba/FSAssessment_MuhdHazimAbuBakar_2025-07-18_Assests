"use client";
import { fetchCourses } from "@/app/services/fetchCourses";
import PageWrapper from "@/components/pageWrapper";
import type { Courses } from "@/types";
import { useEffect, useState } from "react";
import FilterBar from "./filterBar";
import CoursesTable from "./table";

const Courses = () => {
  const [data, setFetchCourses] = useState<Courses[]>([]);
  const [dataFilter, setDataFilter] = useState<Courses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCourses({ setFetchCourses, setDataFilter });
  }, []);

  const onSuccess = () => {
    fetchCourses({ setFetchCourses, setDataFilter });
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="my-4">This is the courses page.</p>
      <FilterBar
        data={data}
        setDataFilter={setDataFilter}
        setCurrentPage={setCurrentPage}
      />
      <CoursesTable
        currentPage={currentPage}
        dataFilter={dataFilter}
        setFetchCourses={setFetchCourses}
        setDataFilter={setDataFilter}
        onSuccess={onSuccess}
        setCurrentPage={setCurrentPage}
      />
    </PageWrapper>
  );
};
export default Courses;
