"use client";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import { useUserLoggedInState } from "@/store/userLogin";
import { UserRole, Users } from "@/types";
import RoleSelectOptions from "@/utils/roleSelectOptions";
import { Button, Card, Form, Input, notification, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchEntities } from "../services/fetchEntities";

const AdminPage = () => {
  const [instructors, setInstructor] = useState<Users[]>([]);
  const [superAdmins, setSuperAdmins] = useState<Users[]>([]);
  const [form] = Form.useForm();
  const role = useUserLoggedInState((state) => state.role);

  const fetchData = () => {
    fetchEntities<Users>({
      setfetchEntities: (data) => {
        const roleInstructor = data
          .filter((u) => u.role === UserRole.INSTRUCTOR)
          .map((u) => ({ ...u }));
        setInstructor(roleInstructor);

        const roleSuperAdmin = data
          .filter((u) => u.role === UserRole.SUPERADMIN)
          .map((u) => ({ ...u }));
        setSuperAdmins(roleSuperAdmin);
      },
      entities: "users",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const handleSubmit = async (values: Users) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.user.createUser,
        values
      );
      if (response.status === 201) {
        notification.success({
          message: "User created successfully",
        });
        form.resetFields();
        fetchData();
      }
    } catch (err) {
      notification.error({
        message: "Failed to create user",
      });
      console.error("Create error:", err);
    }
  };

  return (
    <PageWrapper>
      <div className="flex h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center w-screen min-h-screen">
          This is the Admin Page
          <div className="flex gap-12 justify-around mt-4">
            <Table
              title={() => "List of Instructor"}
              columns={column}
              dataSource={instructors}
              rowKey="_id"
            />

            <Table
              title={() => "List of SuperAdmin"}
              columns={column}
              dataSource={superAdmins}
              rowKey="_id"
            />
            {role === UserRole.SUPERADMIN ? (
              <Card>
                <Form
                  onFinish={handleSubmit}
                  form={form}
                  name="admin-form"
                  layout="vertical"
                  style={{ maxWidth: 400 }}
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter name..." />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter email..." />
                  </Form.Item>
                  <Form.Item
                    name="identification"
                    label="Identification"
                    //   rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter identification..." />
                  </Form.Item>
                  <RoleSelectOptions admin />
                  <Form.Item name="password" label="Password">
                    <Input.Password placeholder="Enter password..." />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
export default AdminPage;
