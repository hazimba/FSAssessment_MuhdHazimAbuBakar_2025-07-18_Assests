import apiEndpoints from "@/config/apiEndPoint";
import { Courses } from "@/types";
import { Button, Popconfirm } from "antd";
import axios from "axios";
import { usePathname } from "next/navigation";

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
  console.log("Record:", record);
  const pathname = usePathname();
  console.log("Pathname:", pathname);

  const endPoint =
    pathname === "/courses" ? apiEndpoints.course : apiEndpoints.user;
  const name = pathname === "/courses" ? "course" : "user";

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${endPoint.deleteCourse}/${id}`
      );
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }
      await fetchCourses();
      console.log("Delete response:", response.data);
      onSuccess();
    } catch (error) {
      console.error(`Error deleting ${name} :`, error);
    }
  };

  const handleUndelete = async (id: string) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_MONGO_DB_API}${endPoint.restoreCourse}/${id}`
      );
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }
      await fetchCourses();
      console.log("Undelete response:", response.data);
      onSuccess();
    } catch (error) {
      console.error(`Error restoring ${name} employee:`, error);
    }
  };

  return (
    <div className="flex space-x-2">
      <button className="text-blue-500 hover:underline">Edit</button>
      <Popconfirm
        title={`Are you sure you want to ${
          record.status === "Active" ? "delete" : "undelete"
        } this course?`}
        onConfirm={() => {
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
