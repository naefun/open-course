import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Context } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import Sidebar from "../components/Sidebar";
import Unit from "../components/Unit";
import "./coursearea.css";
import { useNavigate } from "react-router-dom";

function CourseArea() {
  let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useContext(Context);
  const [course, setCourse] = useState({});
  const [noteContent, setNoteContent] = useState("");
  const [currentUnit, setCurrentUnit] = useState({});
  const [currentLesson, setCurrentLesson] = useState({});
  const [userId, setUserId] = useState("test");
  const [currentLessonCompleted, setcurrentLessonCompleted] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/courses/" + id)
      .then((response) => {
        const courseData = response.data;
        console.log("getting course");
        setCourse(courseData);
        setUnitLesson(courseData);
      })
      .catch((error) => {});

    setNoteContentIfExists();
  }, []);

  useEffect(() => {
    if (course.units == undefined) {
    } else {
      setUnitLesson(course);
    }

    setNoteContentIfExists();
  }, [searchParams.get("lessonId"), searchParams.get("unitId")]);

  const handleChange = (event) => {
    setNoteContent(event.target.value);
  };

  const setNoteContentIfExists = async () => {
    const note = await lessonHasNote();
    if (note.content != undefined) {
      console.log(note.content);
      setNoteContent(note.content);
    } else {
      setNoteContent("");
    }
  };

  const setUnitLesson = (courseData) => {
    const unitId = searchParams.get("unitId");
    const lessonId = searchParams.get("lessonId");

    console.log(unitId);
    if (unitId === null) {
      console.log("The unit id is null");
      navigate(
        "/course/" +
          id +
          "?unitId=" +
          courseData.units[0].id +
          "&lessonId=" +
          courseData.units[0].lessons[0].id,
        {
          replace: true,
        }
      );
    }

    const myUnit = courseData.units.filter((unit) => unit.id == unitId)[0];
    const myLesson = myUnit.lessons.filter(
      (lesson) => lesson.id == lessonId
    )[0];
    // setNoteContent("");
    setCurrentUnit(myUnit);
    setCurrentLesson(myLesson);
    setcurrentLessonCompleted(myLesson.completed);
  };

  const lessonHasNote = async () => {
    const res = await axios
      .get("http://localhost:5000/api/v1/notes", {
        params: {
          lessonId: searchParams.get("lessonId"),
          userId: userId,
        },
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {});

    console.log(res);
    return res.data;
  };

  const saveNote = async (e) => {
    e.preventDefault();
    const notes = await lessonHasNote();
    // check if note already exists for this lesson
    if (notes.length === 0 || notes.content == undefined) {
      // if it doesnt then create new note
      console.log("creating note");
      createNote();
    }else {
      // else update existing note
      console.log("updating note");
      updateNote(notes);
    }
  };

  const createNote = () => {
    axios
      .post("http://localhost:5000/api/v1/notes", {
        user_id: "test",
        course_id: course.id,
        unit_id: currentUnit.id,
        lesson_id: currentLesson.id,
        content: noteContent,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});
  };

  const updateNote = (note) => {
    axios
      .put("http://localhost:5000/api/v1/notes", {
        id: note.id,
        user_id: note.user_id,
        course_id: note.course_id,
        unit_id: note.unit_id,
        lesson_id: note.lesson_id,
        content: noteContent
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});
  };

  const updateLessonCompleted = (lessonId, lessonComplete) => {
    const updatedCourse = course;
    console.log(updatedCourse);

    let foundLesson = false;
    for (
      let unitIndex = 0;
      unitIndex < updatedCourse.units.length;
      unitIndex++
    ) {
      for (
        let lessonIndex = 0;
        lessonIndex < updatedCourse.units[unitIndex].lessons.length;
        lessonIndex++
      ) {
        if (
          updatedCourse.units[unitIndex].lessons[lessonIndex].id === lessonId
        ) {
          updatedCourse.units[unitIndex].lessons[lessonIndex].completed =
            lessonComplete;
          console.log(
            "updated lesson: " +
              lessonId +
              " lesson completed: " +
              lessonComplete
          );
          foundLesson = true;
          break;
        }
      }
      if (foundLesson) {
        break;
      }
    }

    console.log(updatedCourse);
    axios({
      method: "put",
      url: "http://localhost:5000/api/v1/courses/" +id,
      data: updatedCourse,
    });
  };

  const completeLessonHandleSubmit = (e) => {
    console.log("completed lesson");
    let lessonComplete = !currentLessonCompleted;
    setcurrentLessonCompleted(lessonComplete);
    updateLessonCompleted(
      searchParams.get("lessonId"),
      !currentLessonCompleted
    );
  };

  return (
    <div className="container">
      <Sidebar title={course.title}>
        {course.units !== undefined ? (
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

      <main className="mainContent__coursearea">
        <div className="videoArea">
          {/* <YouTube videoId="2g811Eo7K8U" /> cors issues*/}
          <iframe
            className="video"
            src={
              "https://www.youtube.com/embed/" + currentLesson.youtubeVideoId
            }
          ></iframe>
        </div>

        <div className="notesArea">
          <p>Lesson: {currentLesson.position}</p>
          <h2 className="lessonTitle">{currentLesson.title}</h2>
          <form>
            <label>
              Completed lesson?{" "}
              <input
                type="checkbox"
                checked={currentLessonCompleted}
                onChange={completeLessonHandleSubmit}
              />
            </label>
          </form>
          <p>Your notes</p>
          <form onSubmit={saveNote}>
            <textarea
              className="note"
              name="notes"
              id="notes"
              cols="30"
              rows="20"
              value={noteContent}
              onChange={handleChange}
            ></textarea>
            {/* TODO add markdown text box https://github.com/remarkjs/react-markdown#examples */}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </main>
    </div>
  );
}

export default CourseArea;
