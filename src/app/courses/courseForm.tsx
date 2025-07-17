"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { fetchEntities } from "../services/fetchEntities";
import { Courses, UserRole, Users } from "@/types";

interface CourseFormProps {
  initialValues: Courses;
  onSubmit: (values: Courses) => void;
  loading?: boolean;
}

const CourseForm = ({ initialValues, onSubmit, loading }: CourseFormProps) => {
  const [form] = Form.useForm();

  const [instructorOptions, setInstructor] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    fetchEntities<Users>({
      setfetchEntities: (data) => {
        const roleInstructor = data
          .filter((u) => u.role === UserRole.INSTRUCTOR)
          .map((u) => ({
            value: u._id,
            label: u.name,
          }));
        setInstructor(roleInstructor);
      },
      entities: "users?role=Instructor",
    });
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      name="course-form"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      layout="vertical"
    >
      <Form.Item name="_id" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="Enter title..." />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input placeholder="Enter description..." />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter price..."
          min={0}
          step={0.01}
          stringMode
        />
      </Form.Item>

      <Form.Item
        name="instructor_id"
        label={`${UserRole.INSTRUCTOR}`}
        rules={[{ required: true, message: "Please select an instructor" }]}
      >
        <Select
          placeholder="Select an instructor"
          allowClear
          options={instructorOptions}
        />
      </Form.Item>

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

export default CourseForm;
