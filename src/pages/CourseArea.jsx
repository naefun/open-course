import React from "react";
import { useParams } from "react-router";

function CourseArea() {
  let { id } = useParams();

  return <div>this is course: {id}</div>;
}

export default CourseArea;
