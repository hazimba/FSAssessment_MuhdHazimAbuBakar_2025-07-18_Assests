"use client";
import { notification } from "antd";
import UserForm from "../userForm";
import axios from "axios";
import apiEndpoints from "@/config/apiEndPoint";
import { Users } from "@/types";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();

  const handleSubmit = async (values: Users) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.user.createUser,
        values
      );
      console.log("Created:", response.data);
      notification.success({
        message: "User created successfully",
      });
      router.push("/users");
    } catch (err) {
      notification.error({
        message: "Failed to create users",
      });
      console.error("Create error:", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};
export default Create;
