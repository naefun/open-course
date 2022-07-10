import axios from "axios";

// json server url
const url = "http://localhost:3000";

// opencourse api url
const apiurl = "http://localhost:5000/api/v1";

const openCourseApi = axios.create({
  baseURL: apiurl,
});

export const getCourse = async (courseId) => {
  const response = await openCourseApi.get(`/courses/${courseId}`);

  return response.data;
};

export const createCourse = async (course) => {
  const response = await axios({
    method: "post",
    url: apiurl + "/courses",
    data: course,
  });

  return response.data;
};
