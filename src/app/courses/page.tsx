"use client";
import { fetchEntities } from "@/app/services/fetchEntities";
import PageWrapper from "@/components/pageWrapper";
import type { Courses } from "@/types";
import { useEffect, useState } from "react";
import FilterBar from "./filterBar";
import CoursesTable from "./table";

const Courses = () => {
  const [data, setfetchEntities] = useState<Courses[]>([]);
  const [dataFilter, setDataFilter] = useState<Courses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEntities<Courses>({
      setfetchEntities,
      setDataFilter,
      entities: "courses",
    });
  }, []);

  const onSuccess = () => {
    fetchEntities<Courses>({
      setfetchEntities,
      setDataFilter,
      entities: "courses",
    });
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
        setfetchEntities={setfetchEntities}
        setDataFilter={setDataFilter}
        onSuccess={onSuccess}
        setCurrentPage={setCurrentPage}
      />
    </PageWrapper>
  );
};
export default Courses;
