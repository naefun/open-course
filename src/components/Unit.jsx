import React from "react";
import "./unit.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useEffect } from "react";

function Unit(props) {
  const title = props.title;
  const lessons = props.lessons;
  const courseId = props.courseId;

  const [showLessons, setShowLessons] = useState(false);

  const toggleDisplay = () => {
    setShowLessons(!showLessons);
    console.log(showLessons);
  };

  const conditionalStyles = classNames({
    toggleDisplay: !showLessons,
    "": showLessons,
  });

  useEffect(() => {
    setShowLessons(false);
  }, [courseId]);

  const compare = (a, b) => {
    if (a.position < b.position) {
      return -1;
    } else if (a.position > b.position) {
      return 1;
    }
    return 0;
  };

  lessons.sort(compare);

  return (
    <section className="unit">
      <div className="toggler" onClick={toggleDisplay}>
        <h4>{title}</h4>
      </div>
      <div className={conditionalStyles}>
        <hr />
        <ol>
          {lessons !== undefined
            ? lessons.map((lesson, i) => {
                return (
                  <li key={lesson.id}>
                    <span>{lesson.completed ? "✅ " : ""}</span>
                    <Link to={"/course/" + courseId + "?lessonId=" + lesson.id}>
                      {lesson.title}
                    </Link>
                  </li>
                );
              })
            : ""}
        </ol>
      </div>
    </section>
  );
}

export default Unit;
