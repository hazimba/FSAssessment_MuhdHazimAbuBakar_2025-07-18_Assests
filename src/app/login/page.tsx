"use client";
import { useUserLoggedInState } from "@/store/userLogin";
import { Users } from "@/types";
import { Button, Card, Form, Input, notification } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="flex h-screen">
      <div className="w-2/3 flex items-center justify-center">
        <div className="text-center mt-4 text-sm text-gray-500 opacity-20">
          <p>app@superAdmin.com / app123</p>
          <p>app@instructor.com / app123</p>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-center bg-gray-100">
        <Card className="w-96 p-6 shadow-lg">
          <div className="text-center mb-8 text-2xl font-bold">
            Log in to continue
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter Email..." />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter Password..." />
            </Form.Item>
            <div className="w-full text-end mb-3 text-[11px]">
              Dont have an account? Contact our <Link href="/admin">admin</Link>
            </div>
            <Form.Item>
              <Button
                htmlType="submit"
                color="primary"
                variant="solid"
                loading={loading}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
