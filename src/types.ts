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
  name: string;
  email: string;
  role: string;
  status: string;
}
