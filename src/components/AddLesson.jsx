import React from "react";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/GlobalState";
import { createLessonObject } from "../data-objects/Course";

function AddLesson(props) {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonVideoId, setLessonVideoId] = useState("");
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.createCourseSwitch) {
      console.log("creating course");
      console.log("adding lesson for unit: " + props.unitId);
      dispatch({
        type: "CREATE_COURSE_ADD_LESSON",
        payload: createLessonObject(
          lessonTitle,
          1,
          lessonVideoId,
          props.unitId
        ),
      });
    } else {
      console.log("not creating course yet");
    }
  }, [state.createCourseSwitch]);

  const handleLessonTitle = (e) => {
    setLessonTitle(e.target.value);
  };
  const handleLessonVideoId = (e) => {
    setLessonVideoId(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name="lessonTitle"
        id="lessonTitle"
        placeholder="Lesson title"
        value={lessonTitle}
        onChange={handleLessonTitle}
        required
      />
      -
      <input
        type="text"
        name="lessonVideoId"
        id="lessonVideoId"
        placeholder="Lesson video id"
        value={lessonVideoId}
        onChange={handleLessonVideoId}
        required
      />
    </div>
  );
}

export default AddLesson;
