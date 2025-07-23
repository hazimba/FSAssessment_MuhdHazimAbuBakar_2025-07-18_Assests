"use client";
import { notification } from "antd";
import UserForm from "../userForm";
import axios from "axios";
import apiEndpoints from "@/config/apiEndPoint";
import { Courses, UserRole, Users } from "@/types";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/pageWrapper";

const Create = () => {
  const router = useRouter();

  const handleSubmit = async (values: Users | Courses) => {
    try {
      if ("role" in values && values.role === UserRole.INSTRUCTOR) {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.user.updateUser}/${values._id}`,
          values
        );
        if (response.status === 200) {
          notification.success({
            message: "User updated successfully",
          });
        }
      } else {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.user.createUser,
          values
        );
        if (response.status === 201) {
          notification.success({
            message: "User created successfully",
          });
        }
      }

      router.push("/users");
    } catch (err) {
      notification.error({
        message: "Failed to create users",
      });
      console.error("Create error:", err);
    }
  };
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Create User</h1>
        <UserForm onSubmit={handleSubmit} />
      </div>
    </PageWrapper>
  );
};
export default Create;
