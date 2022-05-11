import axios from "axios";

const url = "http://localhost:3000";

const openCourseApi = axios.create({
  baseURL: url,
});

export const getCourse = async (courseId) => {
  const response = await openCourseApi.get(`/courses/${courseId}`);

  return response.data;
};

export const createCourse = async (course) => {
  const response = await axios({
    method: "post",
    url: url + "/courses",
    data: course,
  });

  return response.data;
};
