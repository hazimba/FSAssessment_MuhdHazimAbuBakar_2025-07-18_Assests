"use client";
import { Courses, UserRole } from "@/types";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { fetchEntities } from "../services/fetchEntities";

const { Option } = Select;

interface CourseFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: any) => void;
  loading?: boolean;
}

const UserForm = ({ initialValues, onSubmit, loading }: CourseFormProps) => {
  const [form] = Form.useForm();
  const role = Form.useWatch("role", form);

  const [courses, setCoruses] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    fetchEntities<Courses>({
      setfetchEntities: (data) => {
        const roleInstructor = data.map((u) => ({
          value: u._id,
          label: u.title,
        }));
        setCoruses(roleInstructor);
      },
      entities: "courses",
    });
  }, []);
  console.log("Courses:", courses);

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
      style={{ width: "400px" }}
      layout="vertical"
    >
      <Form.Item name="_id" hidden>
        <Input type="hidden" />
      </Form.Item>

      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter name..." />
      </Form.Item>

      <Form.Item name="identification" label="Identification">
        <Input placeholder="Enter identification..." />
      </Form.Item>

      <Form.Item name="role" label="Role">
        <Select
          placeholder="Select role..."
          onChange={(e) => console.log(e)}
          //   onClick={(e) => console.log(e)}
        >
          {Object.values(UserRole).map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {role === "Student" && (
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
