import { UserRole } from "@/types";
import { Form, Select } from "antd";

interface RoleSelectOptionsProps {
  admin?: boolean;
  isEditMode?: boolean;
  role?: string;
}

const RoleSelectOptions = ({
  admin = false,
  isEditMode = false,
}: RoleSelectOptionsProps) => {
  const roles = Object.values(UserRole).filter((role) =>
    admin ? role !== UserRole.STUDENT : role !== UserRole.SUPERADMIN
  );

  return (
    <Form.Item name="role" label="Role">
      <Select disabled={isEditMode} placeholder="Enter role...">
        {roles.map((role) => (
          <Select.Option key={role} value={role}>
            {role}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default RoleSelectOptions;
