"use client";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import { Courses, Users } from "@/types";
import { Tag } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewUser = () => {
  const { id } = useParams();
  const [userValue, setUserValue] = useState<Users | null>(null);
  const [coursesValue, setCoursesValue] = useState<Courses[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.getCourses}`
        );
        setCoursesValue(
          response.data.filter((courses: Courses) => {
            return {
              id: courses._id,
              title: courses.title,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.user.getUser}/${id}`
        );
        setUserValue(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!userValue) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  const renderCourses = () => {
    const enrolledTitles = userValue.enrollment
      .map((courseId: string) => {
        const course = coursesValue.find((c: Courses) => c._id === courseId);
        return course?.title;
      })
      .filter(Boolean);

    return (
      <div className="flex flex-wrap gap-1">
        {enrolledTitles.length > 0 ? (
          enrolledTitles.map((title, idx) => (
            <Tag key={idx} color="blue">
              {title}
            </Tag>
          ))
        ) : (
          <Tag>No courses enrolled</Tag>
        )}
      </div>
    );
  };

  const render = () => {
    return (
      <div className="flex flex-col items-center justify-center w-screen">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-[400px] mt-6 text-sm">
          <div className="font-semibold text-right">NAME</div>
          <div>{userValue.name}</div>

          <div className="font-semibold text-right">ROLE</div>
          <div>{userValue.role}</div>

          <div className="font-semibold text-right">STATUS</div>
          <div>{userValue.status}</div>

          <div className="font-semibold text-right">IDENTIFICATION</div>
          <div>{userValue.identification}</div>

          {userValue.enrollment && (
            <>
              <div className="font-semibold text-right">ENROLLMENT</div>
              <div className="flex flex-wrap gap-1">{renderCourses()}</div>
            </>
          )}
        </div>
      </div>
    );
  };

  return <PageWrapper>{userValue && <div>{render()}</div>}</PageWrapper>;
};

export default ViewUser;
