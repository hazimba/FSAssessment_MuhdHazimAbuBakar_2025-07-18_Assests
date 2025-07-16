"use client";
import { useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";

const { Option } = Select;

interface CourseFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const CourseForm = ({ initialValues, onSubmit, loading }: CourseFormProps) => {
  const [form] = Form.useForm();

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
        label="Instructor"
        rules={[{ required: true, message: "Please select an instructor" }]}
      >
        <Select placeholder="Select an instructor" allowClear>
          <Option value="664f1701ebd5c8b7f3ab71f4">Instructor 1</Option>
          <Option value="664f1717c31e4c87fae88273">Instructor 2</Option>
        </Select>
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
