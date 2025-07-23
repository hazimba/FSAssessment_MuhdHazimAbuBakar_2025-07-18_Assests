"use client";
import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import "antd/dist/reset.css";
import Link from "next/link";
import { useUserLoggedInState } from "@/store/userLogin";
import dayjs from "dayjs";

export default function Home() {
  const loggedInUser = useUserLoggedInState((state) => state.loggedInUser);
  const dateNow = dayjs().format("hh:mm A (DD MMMM YYYY)");

  const menu = [
    {
      key: "1",
      label: (
        <Link href="/admin" prefetch={false}>
          Admin
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/login" prefetch={false}>
          Log Out
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-screen items-end w-screen bg-gray-100 ">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-full px-4">
          <Tag color="#3b5999" className="!p-1">
            {dateNow}
          </Tag>
          <div className="mr-4">Hi! {loggedInUser}</div>
        </div>
        <Dropdown menu={{ items: menu }} className="!m-6">
          <UserOutlined />
        </Dropdown>
      </div>
      <div className="flex flex-col gap-12 items-center justify-center w-screen h-full">
        <div className="text-4xl">Dashboard</div>
        <div className="flex items-center gap-4">
          <Button className="my-4 transition-all duration-300 transform hover:scale-110 hover:bg-black">
            <Link
              href="/courses"
              prefetch={false}
              className="text-blue-500 text-xl"
            >
              Courses
            </Link>
          </Button>
          <Button className="my-4 transition-all duration-300 transform hover:scale-110 hover:bg-black">
            <Link
              href="/users"
              prefetch={false}
              className="text-blue-500 text-xl"
            >
              Users
            </Link>
          </Button>
          <Button className="my-4 transition-all duration-300 transform hover:scale-110 hover:bg-black">
            <Link
              href="/underConstruction"
              prefetch={false}
              className="text-blue-500 text-xl"
            >
              Quizzes & Submissions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
