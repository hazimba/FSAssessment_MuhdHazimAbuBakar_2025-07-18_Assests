"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageWrapper from "@/components/pageWrapper";
import axios from "axios";
import apiEndpoints from "@/config/apiEndPoint";
import { Image } from "antd";
import { Courses } from "@/types";
import { usePathname } from "next/navigation";

const ViewCourse = () => {
  const { id } = useParams();
  const [courseValue, setCourseValue] = useState<Courses | null>(null);
  const pathname = usePathname();
  console.log("Pathname:", pathname);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.getCourse}/${id}`
        );
        setCourseValue(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);
  if (!courseValue) {
    return <PageWrapper>Loading...</PageWrapper>;
  }
  console.log("Initial Data:", courseValue);
  const render = () => {
    return (
      <div className="flex flex-col items-center justify-center w-screen">
        <Image
          width={300}
          className="rounded-2xl shadow-lg"
          alt="Course Image"
          src="https://cdn.britannica.com/39/226539-050-D21D7721/Portrait-of-a-cat-with-whiskers-visible.jpg"
        />
        <div className="flex gap-20 justify-center w-screen items-center mt-4">
          <div className=" font-semibold">
            <div>TITLE</div>
            <div>DESCRIPTION</div>
            <div>STATUS</div>
            <div>PRICE</div>
            {/* <div>INSTRUCTOR ID</div> */}
          </div>
          <div className="">
            <div>: {courseValue.title}</div>
            <div>: {courseValue.description}</div>
            <div>: {courseValue.status}</div>
            <div>: RM {courseValue.price.$numberDecimal}</div>
            {/* <div>: {courseValue.instructor_id}</div> */}
          </div>
        </div>
      </div>
    );
  };

  return <PageWrapper>{courseValue && <div>{render()}</div>}</PageWrapper>;
};

export default ViewCourse;
