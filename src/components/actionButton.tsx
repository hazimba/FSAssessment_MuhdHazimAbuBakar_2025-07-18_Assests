"use client";
import CourseForm from "@/app/courses/courseForm";
import UserForm from "@/app/users/userForm";
import apiEndpoints from "@/config/apiEndPoint";
import { Courses, Status, Users } from "@/types";
import { Button, Modal, notification, Popconfirm } from "antd";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ActionButtonsProps {
  record: Courses | Users;
  fetchEntities?: () => void;
  onSuccess: () => void;
}

const ActionButtons = ({
  record,
  fetchEntities,
  onSuccess,
}: ActionButtonsProps) => {
  const pathname = usePathname();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const name = pathname === "/courses" ? "course" : "user";

  const page = pathname.includes("/courses");

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${
          page ? apiEndpoints.course.deleteCourse : apiEndpoints.user.deleteUser
        }/${id}`
      );
      if (!response || !response.data) {
        notification.error({
          message: `Error deleting ${name}`,
          description: response.statusText,
        });
        throw new Error("Network response was not ok");
      }
      notification.success({
        message: `Deleted successfully`,
      });
      if (fetchEntities) {
        await fetchEntities();
      }
      onSuccess();
    } catch (error) {
      console.error(`Error deleting ${name} :`, error);
    }
  };

  const handleUndelete = async (id: string) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${
          page
            ? apiEndpoints.course.restoreCourse
            : apiEndpoints.user.restoreUser
        }/${id}`
      );
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }
      if (fetchEntities) {
        await fetchEntities();
      }
      onSuccess();
    } catch (error) {
      console.error(`Error restoring ${name} employee:`, error);
    }
  };
  const [initialValue, setInitialValue] = useState<Courses | Users | null>(
    null
  );

  const handleModalOpen = (record: Courses) => {
    setOpenModalEdit(true);

    if (name === "course") {
      setInitialValue({
        ...record,
        price: record.price.$numberDecimal,
      } as unknown as Courses);
    } else {
      setInitialValue(record as unknown as Users);
    }
  };

  const handleModalCancel = () => {
    setOpenModalEdit(false);
    setInitialValue(null);
  };

  const handleFormSubmit = async (values: Courses | Users) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${
          page ? apiEndpoints.course.updateCourse : apiEndpoints.user.updateUser
        }/${values._id}`,
        values
      );
      if ("enrollment" in values && Array.isArray(values.enrollment)) {
        for (const courseId of values.enrollment) {
          const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_MONGO_DB_API}${apiEndpoints.course.updateCourse}/${courseId}`,
            {
              $addToSet: { student_ids: values._id },
            }
          );

          if (res.status !== 200) {
            notification.error({
              message: `Error updating course ${courseId}`,
              description: res.statusText,
            });
            throw new Error(
              `Error updating course ${courseId}: ${res.statusText}`
            );
          }
        }
      }

      if (!response || response.status !== 200) {
        notification.error({
          message: `Error updating ${name}`,
          description: response.statusText,
        });
        throw new Error(`Error updating ${name}: ${response?.statusText}`);
      }

      notification.success({
        message: `Updated successfully`,
      });
      if (fetchEntities) {
        await fetchEntities();
      }
      onSuccess();
    } catch (error) {
      console.error(`Error updating ${name}:`, error);
    } finally {
      setOpenModalEdit(false);
      setInitialValue(null);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleModalOpen(record as Courses);
        }}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Button>
      <Modal
        title={`Edit ${name}`}
        open={openModalEdit}
        onCancel={handleModalCancel}
        footer={null}
      >
        {initialValue && name === "course" && (
          <CourseForm
            initialValues={initialValue as Courses}
            onSubmit={handleFormSubmit}
            loading={false}
          />
        )}
        {initialValue && name === "user" && (
          <UserForm
            initialValues={initialValue}
            onSubmit={handleFormSubmit}
            loading={false}
          />
        )}
      </Modal>
      <Popconfirm
        title={`Are you sure you want to ${
          record.status === Status.ACTIVE ? "delete" : "undelete"
        } this ${name}?`}
        onConfirm={(e) => {
          e?.stopPropagation();
          if (record._id && record.status === Status.ACTIVE) {
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
          {record.status === Status.ACTIVE ? "Delete" : "Undelete"}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ActionButtons;
