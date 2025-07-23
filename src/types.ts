export interface Courses {
  _id: string;
  title: string;
  description: string;
  status: string;
  price: {
    $numberDecimal: string;
  };
  instructor_id: string;
  image_url?: string;
}

export interface Users {
  _id: string;
  role: string;
  name: string;
  status: string;
  identification: string;
  createdAt: Date;
  updatedAt: Date;
  instructors: Users[];
  enrollment: string[];
  password?: string;
  email?: string;
}

export enum UserRole {
  STUDENT = "Student",
  INSTRUCTOR = "Instructor",
  SUPERADMIN = "SuperAdmin",
}

export enum Status {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
