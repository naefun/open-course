import React from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

function CourseArea() {
  let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      this is course: {id}
      <br />
      this is lesson: {searchParams.get("lessonId")}
    </div>
  );
}

export default CourseArea;
