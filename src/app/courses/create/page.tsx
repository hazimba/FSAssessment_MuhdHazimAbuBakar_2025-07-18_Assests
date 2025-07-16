"use client";
import PageWrapper from "@/components/pageWrapper";
import CourseForm from "@/app/courses/courseForm";
import apiEndpoints from "@/config/apiEndPoint";
import axios from "axios";

const CreateCoursePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.course.createCourse,
        values
      );
      console.log("Created:", response.data);
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  return (
    <PageWrapper>
      <CourseForm onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default CreateCoursePage;
