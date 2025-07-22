"use client";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import "antd/dist/reset.css";
import Link from "next/link";
import { useUserLoggedInState } from "@/store/userLogin";
import dayjs from "dayjs";

export default function Home() {
  const loggedInUser = useUserLoggedInState((state) => state.loggedInUser);
  const dateNow = dayjs().format("hh:mm A (DD MMMM YYYY)");
  return (
    <div className="flex flex-col h-screen items-end w-screen bg-gray-100 ">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-full px-4">
          <div>{dateNow}</div>
          <div className="mr-4">Hi! {loggedInUser}</div>
        </div>
        <Dropdown
          menu={{
            items: [
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
            ],
          }}
          className="!m-6"
        >
          <UserOutlined />
        </Dropdown>
      </div>
      <div className="flex flex-col items-center justify-center w-screen h-full">
        <h2 className="text-2xl font-bold">Menu</h2>
        <Link
          href="/courses"
          prefetch={false}
          className="text-blue-500 text-xl"
        >
          Courses
        </Link>
        <Link href="/users" prefetch={false} className="text-blue-500 text-xl">
          Users
        </Link>
      </div>
    </div>
  );
}
