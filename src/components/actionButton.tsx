"use client";
import CourseForm from "@/app/courses/courseForm";
import { Courses } from "@/types";
import { Button, Modal, Popconfirm } from "antd";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState } from "react";
import apiEndpoints from "@/config/apiEndPoint";

interface ActionButtonsProps {
  record: Courses;
  fetchCourses: () => void;
  onSuccess: () => void;
}

const ActionButtons = ({
  record,
  fetchCourses,
  onSuccess,
}: ActionButtonsProps) => {
  const pathname = usePathname();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const name = pathname === "/courses" ? "course" : "user";

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.deleteCourse}/${id}`
      );
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }
      await fetchCourses();
      onSuccess();
    } catch (error) {
      console.error(`Error deleting ${name} :`, error);
    }
  };

  const handleUndelete = async (id: string) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.restoreCourse}/${id}`
      );
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }
      await fetchCourses();
      onSuccess();
    } catch (error) {
      console.error(`Error restoring ${name} employee:`, error);
    }
  };
  const [initialValue, setInitialValue] = useState(null);

  const handleModalOpen = (record: Courses) => {
    setOpenModalEdit(true);
    setInitialValue({
      ...record,
      price: parseFloat(record.price.$numberDecimal) || 0,
    });
  };

  const handleModalCancel = () => {
    setOpenModalEdit(false);
    setInitialValue(null);
  };

  const handleFormSubmit = async (values: Courses) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.updateCourse}/${values._id}`,
        values
      );
      if (response && response.status !== 200) {
        throw new Error(`Error updating ${name}: ${response.statusText}`);
      }

      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }
      fetchCourses();
      onSuccess();
    } catch (error) {
      console.error(`Error updating ${name}:`, error);
    }
    setOpenModalEdit(false);
    setInitialValue(null);
  };

  return (
    <div className="flex space-x-2">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleModalOpen(record);
        }}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Button>
      <Modal
        title="Edit Course"
        open={openModalEdit}
        onCancel={handleModalCancel}
        footer={null}
      >
        {initialValue && (
          <CourseForm
            initialValues={initialValue}
            onSubmit={handleFormSubmit}
            loading={false}
          />
        )}
      </Modal>
      <Popconfirm
        title={`Are you sure you want to ${
          record.status === "Active" ? "delete" : "undelete"
        } this course?`}
        onConfirm={(e) => {
          e?.stopPropagation();
          if (record._id && record.status === "Active") {
            handleDelete(record._id);
          } else if (record._id && record.status === "Inactive") {
            handleUndelete(record._id);
          }
        }}
        trigger={"click"}
        okText="Yes"
        cancelText="No"
      >
        <Button color="default" danger variant="link">
          {record.status === "Active" ? "Delete" : "Undelete"}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ActionButtons;
