import React from "react";
import "./course.css";
import { Context } from "../context/GlobalState";
import { useContext } from "react";

function Course(props) {
  const [state, dispatch] = useContext(Context);

  let courseTitle = props.courseTitle;
  let unitsComplete = props.unitsComplete;
  let totalUnits = props.totalUnits;
  let courseId = props.courseId;

  const setCourseIdState = () => {
    dispatch({ type: "SET_COURSE", payload: courseId });
    console.log("setting state to: " + courseId);
  };

  return (
    <div className="course" onClick={setCourseIdState}>
      <h3>{courseTitle}</h3>
      <p>
        {unitsComplete}/{totalUnits} units
      </p>
    </div>
  );
}

export default Course;
