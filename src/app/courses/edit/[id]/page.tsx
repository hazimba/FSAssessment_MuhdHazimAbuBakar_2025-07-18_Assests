"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageWrapper from "@/components/pageWrapper";
import CourseForm from "@/app/courses/courseForm";
import axios from "axios";
import apiEndpoints from "@/config/apiEndPoint";

const EditCoursePage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.getCourseById}/${id}`
        );
        const course = response.data;
        setInitialData({
          ...course,
          price: parseFloat(course.price?.$numberDecimal ?? 0),
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.updateCourse}/${id}`,
        values
      );
      console.log("Updated:", response.data);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <PageWrapper>
      {initialData && (
        <CourseForm initialValues={initialData} onSubmit={handleUpdate} />
      )}
    </PageWrapper>
  );
};

export default EditCoursePage;
