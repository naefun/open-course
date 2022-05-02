import React from "react";
import "./course.css";

function Course(props) {
  let courseTitle = props.courseTitle;
  let unitsComplete = props.unitsComplete;
  let totalUnits = props.totalUnits;
  let courseId = props.courseId;

  const setCourseIdState = () => {
    console.log("setting state to: " + courseId);
  };

  return (
    <div className="course" onClick={setCourseIdState}>
      <h3>{courseTitle}</h3>
      <p>
        {unitsComplete}/{totalUnits} units
      </p>
      <p>
        course id: {courseId} <em>remove after implementing</em>
      </p>
    </div>
  );
}

export default Course;
