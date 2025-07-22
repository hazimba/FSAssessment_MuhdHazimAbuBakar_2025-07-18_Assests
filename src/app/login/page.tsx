"use client";
import { Users } from "@/types";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserLoggedInState } from "@/store/userLogin";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setRole = useUserLoggedInState((state) => state.setRole);
  const setLoggedInUser = useUserLoggedInState(
    (state) => state.setLoggedInUser
  );
  //   const role = useUserLoggedInState((state) => state.role);

  const onFinish = async (values: Users) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}/login`,
        values
      );
      if (response.status === 200) {
        router.push("/");
      }
      setRole(response.data.role);
      setLoggedInUser(response.data.name);
    } catch (error) {
      notification.error({
        message: "Login failed",
        description: "Please check your credentials and try again.",
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <p>app@superAdmin.com / app123</p>
        <p>app@instructor.com / app123</p>
      </div>
    </div>
  );
};
export default LoginPage;
