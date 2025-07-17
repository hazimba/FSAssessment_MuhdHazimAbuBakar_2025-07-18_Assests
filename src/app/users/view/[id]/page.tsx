"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageWrapper from "@/components/pageWrapper";
import axios from "axios";
import apiEndpoints from "@/config/apiEndPoint";
import { Image, Tag } from "antd";
import { Courses, Users } from "@/types";

const ViewUser = () => {
  const { id } = useParams();
  const [userValue, setUserValue] = useState<Users | null>(null);
  const [coursesValue, setCoursesValue] = useState<Courses[]>([]);

  useEffect(() => {
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
      <div className="flex flex-wrap justify-end gap-1">
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
        <Image
          width={400}
          className="rounded-2xl shadow-lg"
          alt="Course Image"
          src="https://cdn.britannica.com/39/226539-050-D21D7721/Portrait-of-a-cat-with-whiskers-visible.jpg"
        />
        <div className="flex flex-col items-start mt-6 text-sm w-[400px]">
          <div className="flex w-full justify-between">
            <span className="font-semibold">NAME</span>
            <span>{userValue.name}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-semibold">ROLE</span>
            <span>{userValue.role}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-semibold">STATUS</span>
            <span>{userValue.status}</span>
          </div>
          {userValue.enrollment && (
            <div className="flex w-full justify-between">
              <span className="font-semibold">ENROLLMENT</span>
              <span className="text-right w-[300px]">{renderCourses()}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <PageWrapper>{userValue && <div>{render()}</div>}</PageWrapper>;
};

export default ViewUser;
