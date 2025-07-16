"use client";
import React from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import PageWrapper from "@/components/pageWrapper";
import apiEndpoints from "@/config/apiEndPoint";
import axios from "axios";

const { Option } = Select;

const CreateCourse = () => {
  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);

    const onFinish = async () => {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_MONGO_DB_API +
            apiEndpoints.course.createCourse,
          values
        );
        console.log("Course created successfully:", response.data);
        form.resetFields();
      } catch (error) {
        console.error("Error creating course:", error);
      }
    };
    onFinish();
  };

  return (
    <PageWrapper>
      <Form
        form={form}
        name="create-course"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter Title..." />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Enter Description..." />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter Price..."
            min={0}
            step={0.01}
            stringMode
          />
        </Form.Item>
        <Form.Item name="instructor_id" label="Instructor">
          <Select placeholder="Select an instructor" allowClear>
            <Option value="664f1701ebd5c8b7f3ab71f4">Instructor 1</Option>
            <Option value="664f1717c31e4c87fae88273">Instructor 2</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </PageWrapper>
  );
};

export default CreateCourse;
