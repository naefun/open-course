import React from "react";
import "./unit.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

function Unit() {
  const [showLessons, setShowLessons] = useState(false);

  const toggleDisplay = () => {
    setShowLessons(!showLessons);
    console.log(showLessons);
  };

  const conditionalStyles = classNames({
    toggleDisplay: !showLessons,
    "": showLessons,
  });

  return (
    <section className="unit">
      <div className="toggler" onClick={toggleDisplay}>
        <h4>Unit title</h4>
      </div>
      <div className={conditionalStyles}>
        <hr />
        <ol>
          <li>
            <Link to="/mycourses">Lesson 1</Link>
          </li>
          <li>
            <Link to="/mycourses">Lesson 2</Link>
          </li>
          <li>
            <Link to="/mycourses">Lesson 3</Link>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default Unit;
