import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Context } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import Sidebar from "../components/Sidebar";
import Unit from "../components/Unit";
import "./coursearea.css";

function CourseArea() {
  let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useContext(Context);
  const [course, setCourse] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/" + id)
      .then((response) => {
        const courseData = response.data;
        console.log("getting course");
        setCourse(courseData);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="container">
      <Sidebar title={course.title}>
        {course.units != undefined ? (
          <>
            {course.units.map((unit, i) => {
              return (
                <li key={unit.id}>
                  <Unit
                    title={unit.title}
                    lessons={unit.lessons}
                    courseId={course.id}
                    unitId={unit.id}
                  />
                </li>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Sidebar>

      <main className="mainContent">
        <div className="content">
          {/* <YouTube videoId="2g811Eo7K8U" /> cors issues*/}
          <iframe
            className="video"
            src={"https://www.youtube.com/embed/" + "2g811Eo7K8U"}
          ></iframe>
        </div>
        <h2 className="lessonTitle">Lesson title</h2>
        <p>Your notes</p>
        <form action="" method="post">
          <textarea name="notes" id="notes" cols="30" rows="20"></textarea>
          {/* TODO add markdown text box https://github.com/remarkjs/react-markdown#examples */}
          <button type="submit">Save notes</button>
        </form>
      </main>
    </div>
  );
}

export default CourseArea;
