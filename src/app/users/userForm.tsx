"use client";
import { Courses, UserRole, Users } from "@/types";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { fetchEntities, fetchEntity } from "../services/fetchEntities";
import RoleSelectOptions from "@/utils/roleSelectOptions";

interface CourseFormProps {
  initialValues?: Users | Courses;
  onSubmit?: (values: Users | Courses) => void;
  loading?: boolean;
  isEditMode?: boolean;
}

const UserForm = ({
  initialValues,
  onSubmit,
  loading,
  isEditMode,
}: CourseFormProps) => {
  const [form] = Form.useForm();
  const role = Form.useWatch("role", form);
  const [courses, setCourses] = useState<{ value: string; label: string }[]>(
    []
  );
  const [users, setRoles] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    fetchEntities<Courses>({
      setfetchEntities: (data) => {
        const roleInstructor = data.map((u) => ({
          value: u._id,
          label: u.title,
        }));
        setCourses(roleInstructor);
      },
      entities: "courses",
    });
  }, []);

  useEffect(() => {
    fetchEntities<Users>({
      setfetchEntities: (data: Users[]) => {
        const users = data
          .filter((i) => UserRole.INSTRUCTOR === i.role)
          .map((u) => ({
            value: u._id,
            label: u.name,
          }));
        setRoles(users);
      },
      entities: "users",
    });
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (role === UserRole.STUDENT && !isEditMode) {
      form.setFieldsValue({ identification: null, name: null });
    }
  }, [role, form, isEditMode]);

  return (
    <Form
      form={form}
      name="course-form"
      onFinish={onSubmit}
      style={{ width: "400px" }}
      layout="vertical"
    >
      <Form.Item name="_id" hidden>
        <Input type="hidden" />
      </Form.Item>
      <RoleSelectOptions isEditMode={isEditMode} />

      {role === UserRole.INSTRUCTOR && !isEditMode ? (
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Select
            placeholder="Select instructors..."
            options={users}
            style={{ width: "400px" }}
            onChange={async (value) => {
              const selected = await fetchEntity<Users>(value, "users");

              if (selected) {
                form.setFieldsValue({
                  identification: selected.identification,
                  email: selected.email,
                });
              }
            }}
          />
        </Form.Item>
      ) : (
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter name..." />
        </Form.Item>
      )}

      {role !== UserRole.STUDENT ? (
        <Form.Item name="email" label="Email">
          <Input disabled={isEditMode} placeholder="Enter email..." />
        </Form.Item>
      ) : null}

      <Form.Item name="identification" label="Identification">
        <Input placeholder="Enter identification..." />
      </Form.Item>

      {role === UserRole.STUDENT && (
        <Form.Item name="enrollment" label="Enrollment">
          <Select
            mode="multiple"
            placeholder="Select courses..."
            options={courses}
            style={{ width: "400px" }}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
