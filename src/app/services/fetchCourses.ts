import apiEndpoints from "@/config/apiEndPoint";
import { Courses } from "@/types";
import axios from "axios";

interface FetchCoursesResponse {
  setFetchCourses: (data: Courses[]) => void;
  setDataFilter?: (data: Courses[]) => void;
}

// soon to be replaced with a more generic fetch function
// that can handle different types of data fetching
export const fetchCourses = async ({
  setFetchCourses,
  setDataFilter,
}: FetchCoursesResponse) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_MONGO_DB_API + apiEndpoints.course.getCourses
    );
    setFetchCourses(response.data);
    if (setDataFilter) setDataFilter(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
