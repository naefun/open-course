import React from "react";
import { useState, useEffect } from "react";
import "./createcourse.css";

function CreateCourse() {
  const handleStepOne = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleStepTwo = (e) => {
    e.preventDefault();
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // highlight the current step
    const highlightClassName = "currentStep";

    const steps = document.getElementsByClassName("step");
    console.log(steps);

    for (const step of steps) {
      console.log(step);
      step.classList.remove(highlightClassName);
    }
    steps[currentStep - 1].classList.add(highlightClassName);
  }, [currentStep]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container__createcourse">
      <div className="steps">
        <div className="step">
          <div className="stepNumber">
            {" "}
            <p>1</p>
          </div>
          <div className="stepTitle">Course details</div>
        </div>
        <div className="step">
          <div className="stepNumber">
            <p>2</p>
          </div>
          <div className="stepTitle">Units & lessons</div>
        </div>
      </div>
      <h1>Create a course</h1>

      {currentStep === 1 ? (
        <form onSubmit={handleStepOne}>
          <h2>Input course details</h2>
          <label>
            Title
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Course title"
              value={title}
              onChange={handleTitle}
              required
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Course description"
              required
            />
          </label>
          <input type="submit" value="Next" />
        </form>
      ) : (
        <form onSubmit={handleStepTwo}>
          <h2>Add units and lessons</h2>
          <button onClick={() => setCurrentStep(1)}>Back</button>
          <input type="submit" value="Next" />
        </form>
      )}
    </div>
  );
}

export default CreateCourse;
