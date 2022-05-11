import React from "react";
import { useState, useEffect, useContext } from "react";
import AddLesson from "./AddLesson";
import { Context } from "../context/GlobalState";
import "./addunit.css";
import { v4 as uuidv4 } from "uuid";
import { createUnitObject } from "../data-objects/Course";

function AddUnit(props) {
  const [unitTitle, setUnitTitle] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonObjects, setLessonObjects] = useState([]);
  const [state, dispatch] = useContext(Context);
  const initialUuid = uuidv4();

  useEffect(() => {
    const id = initialUuid;
    console.log("initialising");
    setLessons([{ id: id, lesson: <AddLesson id={id} unitId={props.id} /> }]);
  }, []);

  useEffect(() => {
    const tempLessons = state.createdCourseLessons.filter(
      (lesson) => lesson.unitId === props.id
    );
    tempLessons.map((lesson) => console.log(lesson.title));
    if (tempLessons.length === lessons.length && lessons.length > 0) {
      console.log("BINGO");
      // set lessonObjects array
      setLessonObjects(tempLessons);
    }
  }, [state.createdCourseLessons, lessons.length, props.id]);

  useEffect(() => {
    // TODO create global context of units
    if (lessonObjects.length === lessons.length && lessons.length > 0) {
      dispatch({
        type: "CREATE_COURSE_ADD_UNIT",
        payload: createUnitObject(
          unitTitle,
          unitDescription,
          1,
          lessonObjects,
          props.id
        ),
      });
    }
  }, [lessonObjects, lessons]);

  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };
  const handleUnitDescription = (e) => {
    setUnitDescription(e.target.value);
  };

  const addLesson = (e) => {
    e.preventDefault();
    let updatedLessons = [...lessons];
    const id = uuidv4();
    updatedLessons.push({
      id: id,
      lesson: <AddLesson id={id} unitId={props.id} />,
    });
    setLessons(updatedLessons);
  };

  const removeLesson = (e, id) => {
    e.preventDefault();
    let updatedLessonsList = [];
    for (let i = 0; i < lessons.length; i++) {
      if (id !== lessons[i].id) {
        updatedLessonsList.push(lessons[i]);
      }
    }
    setLessons(updatedLessonsList);
  };

  return (
    <div className="addUnit">
      <div className="createUnitInputs">
        <label>
          Title
          <input
            type="text"
            name="unitTitle"
            id="unitTitle"
            placeholder="Unit title"
            value={unitTitle}
            onChange={handleUnitTitle}
            required
          />
        </label>
        <label>
          Unit description
          <textarea
            type="text"
            name="unitDescription"
            id="unitDescription"
            value={unitDescription}
            rows="5"
            placeholder="Unit description"
            onChange={handleUnitDescription}
            required
          />
        </label>
        <div>
          Lessons
          <div className="addLessons">
            <div id="lessons" className="unitLessons">
              {lessons.map((lesson) => {
                return (
                  <div key={lesson.id} className="unitLesson">
                    {lesson.lesson}
                    <button onClick={(e) => removeLesson(e, lesson.id)}>
                      remove lesson
                    </button>
                  </div>
                );
              })}
            </div>
            <button className="addLesson" onClick={addLesson}>
              Add lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUnit;
