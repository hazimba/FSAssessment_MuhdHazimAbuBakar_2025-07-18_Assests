"use client";
import CourseForm from "@/app/courses/courseForm";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import { Courses } from "@/types";
import { notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateCoursePage = () => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: Courses) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.course.createCourse,
        values
      );
      console.log("Created:", response.data);
      notification.success({
        message: "Course created successfully",
      });
      router.push("/courses");
    } catch (err) {
      notification.error({
        message: "Failed to create course",
      });
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
