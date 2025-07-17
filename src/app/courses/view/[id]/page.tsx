"use client";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import { Courses } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewCourse = () => {
  const { id } = useParams();
  const [courseValue, setCourseValue] = useState<Courses | null>(null);
  const [instructor, setInstructor] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.user.getUser}/${courseValue?.instructor_id}`
        );
        console.log("User response:", response.data);
        setInstructor(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [courseValue?.instructor_id]);

  if (!courseValue) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  const render = () => {
    return (
      <div className="flex flex-col items-center justify-center w-screen">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-[400px] mt-4">
          <div className="font-semibold text-right">TITLE</div>
          <div>{courseValue.title}</div>

          <div className="font-semibold text-right">DESCRIPTION</div>
          <div>{courseValue.description}</div>

          <div className="font-semibold text-right">STATUS</div>
          <div>{courseValue.status}</div>

          <div className="font-semibold text-right">PRICE</div>
          <div>RM {courseValue.price.$numberDecimal}</div>

          <div className="font-semibold text-right">INSTRUCTOR ID</div>
          <div>{instructor}</div>
        </div>
      </div>
    );
  };

  return <PageWrapper>{courseValue && <div>{render()}</div>}</PageWrapper>;
};

export default ViewCourse;
