import React, { useContext, useEffect, useState } from "react";
import "./mycourses.css";
import Course from "../components/Course";
import Unit from "../components/Unit";
import { Context } from "../context/GlobalState";
import axios from "axios";

function MyCourses() {
  const [state, dispatch] = useContext(Context);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/")
      .then((response) => {
        const coursesData = response.data;
        console.log("getting courses");
        setMyCourses(coursesData);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/" + state.course)
      .then((response) => {
        const courseData = response.data;
        console.log("setting current course");
        dispatch({ type: "SET_CURRENT_COURSE", payload: courseData });
      })
      .catch((error) => {});
  }, [state.course]);

  const calculateCompletedUnits = (unitsArray) => {
    let unitsComplete = 0;

    unitsArray.forEach((unit) => {
      let lessonsComplete = 0;
      let lessonsArray = unit.lessons;

      lessonsArray.forEach((lesson) => {
        if (lesson.completed) {
          lessonsComplete++;
          console.log("lesson completed");
        }
      });

      if (lessonsComplete === lessonsArray.length) {
        unitsComplete++;
      }
    });

    return unitsComplete;
  };

  return (
    <div className="myCoursesContainer">
      <aside className="sideBar">
        <h2>Courses</h2>
        <ul className="courseList">
          {myCourses.map((course, i) => {
            return (
              <li key={course.id}>
                <Course
                  courseTitle={course.title}
                  unitsComplete={calculateCompletedUnits(course.units)}
                  totalUnits={course.units.length}
                  courseId={course.id}
                />
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="mainContent">
        {state.currentCourse.units !== undefined ? (
          <>
            <h1>{state.currentCourse.title}</h1>
            <h4>{state.currentCourse.description}</h4>
            {console.log(state.currentCourse)}
            <p>
              Units complete:{" "}
              {calculateCompletedUnits(state.currentCourse.units)}/
              {state.currentCourse.units.length}
            </p>
            <ul className="unitList">
              {state.currentCourse.units.map((unit, i) => {
                return (
                  <li key={unit.id}>
                    <Unit
                      title={unit.title}
                      lessons={unit.lessons}
                      courseId={state.currentCourse.id}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div>
            <p>Select a course to view details</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyCourses;
