import React from "react";
import "./mycourses.css";
import Course from "../components/Course";
import Unit from "../components/Unit";

function MyCourses() {
  return (
    <div className="myCoursesContainer">
      <aside className="sideBar">
        <h2>Courses</h2>
        <ul className="courseList">
          <li>
            <Course
              courseTitle="course title"
              unitsComplete={2}
              totalUnits={12}
              courseId="2def"
            />
          </li>
          <li>
            <Course />
          </li>
          <li>
            <Course />
          </li>
          <li>
            <Course />
          </li>
          <li>
            <Course />
          </li>
          <li>
            <Course />
          </li>
        </ul>
      </aside>

      <main className="mainContent">
        <h1>Course title</h1>
        {/* <h2>Course id: {courseId}</h2> */}
        <p>Units complete: 2/12</p>
        <ul className="unitList">
          <li>
            <Unit />
          </li>
          <li>
            <Unit />
          </li>
          <li>
            <Unit />
          </li>
          <li>
            <Unit />
          </li>
          <li>
            <Unit />
          </li>
        </ul>
      </main>
    </div>
  );
}

export default MyCourses;
