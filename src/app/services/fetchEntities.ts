import apiEndpoints from "@/config/apiEndPoint";
import axios from "axios";

interface fetchEntitiesResponse<T> {
  setfetchEntities: (data: T[]) => void;
  setDataFilter?: (data: T[]) => void;
  entities?: string;
}

export const fetchEntities = async <T>({
  setfetchEntities,
  setDataFilter,
  entities = "courses",
}: fetchEntitiesResponse<T>) => {
  const endPoint =
    entities === "courses"
      ? apiEndpoints.course.getCourses
      : apiEndpoints.user.getUsers;
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_MONGO_DB_API + endPoint
    );
    setfetchEntities(response.data as T[]);
    if (setDataFilter) setDataFilter(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

export const fetchEntity = async <T>(
  id: string,
  entities: string = "courses"
): Promise<T | null> => {
  const endPoint =
    entities === "courses"
      ? apiEndpoints.course.getCourse
      : apiEndpoints.user.getUser;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MONGO_DB_API}${endPoint}/${id}`
    );
    return response.data as T;
  } catch (error) {
    console.error(`Error fetching ${entities.slice(0, -1)} by ID:`, error);
    return null;
  }
};
