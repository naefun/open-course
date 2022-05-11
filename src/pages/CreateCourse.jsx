import React from "react";
import { useState, useEffect, useContext } from "react";
import "./createcourse.css";
import { createCourseObject } from "../data-objects/Course";
import { createCourse } from "../context/actions/CourseActions";
import AddUnit from "../components/AddUnit";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../context/GlobalState";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState([]);
  const [showExitPrompt, setShowExitPrompt] = useState(true);
  const [createdCourseId, setCreatedCourseId] = useState("");
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  window.onload = function () {
    initBeforeUnLoad(showExitPrompt);
  };

  const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
      // Show prompt based on state
      if (showExitPrompt) {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = "";
        }
        return "";
      }
    };
  };

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  useEffect(() => {
    const unitId = uuidv4();
    setUnits([{ id: unitId, unit: <AddUnit id={unitId} /> }]);
    console.log("LOGGIN CREATED COURSE ID: " + createdCourseId);
  }, []);

  const handleStepOne = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleStepTwo = (e) => {
    e.preventDefault();
    handleCreateCourse();
  };

  const handleGoToPreviousStep = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to go back? doing so will lose progress."
      )
    ) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateCourse = async () => {
    const result = await dispatch({ type: "CREATE_COURSE", payload: true });
    return result;
  };

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

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const addUnit = (e) => {
    e.preventDefault();
    let updatedUnits = [...units];
    const unitId = uuidv4();
    updatedUnits.push({ id: unitId, unit: <AddUnit id={unitId} /> });
    setUnits(updatedUnits);
  };

  const removeUnit = (e, id) => {
    e.preventDefault();
    let updatedUnitsList = [];
    for (let i = 0; i < units.length; i++) {
      if (id !== units[i].id) {
        updatedUnitsList.push(units[i]);
      }
    }
    setUnits(updatedUnitsList);
  };

  const navigateToCourse = () => {
    const courseId = createdCourseId;
    cleanup();
    navigate("/course/" + courseId, {
      replace: true,
    });
  };

  useEffect(() => {
    // final step of the create course process
    if (units.length === state.createdCourseUnits.length && units.length > 0) {
      const res = async () => {
        const result = await createCourse(
          createCourseObject(title, description, state.createdCourseUnits)
        );
        console.log(result.id);
        setCreatedCourseId(result.id);
      };

      res();
    }
  }, [state.createdCourseUnits, units, description, title]);

  const cleanup = () => {
    // setCreatedCourseId("");
    dispatch({ type: "RESET_CREATED_COURSE" });
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
        <form className="createCourseForm" onSubmit={handleStepOne}>
          <h2>Input course details</h2>
          <div className="createCourseInputs">
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
              <textarea
                type="text"
                name="description"
                id="description"
                value={description}
                rows="5"
                placeholder="Course description"
                onChange={handleDescription}
                required
              />
            </label>
          </div>
          <input type="submit" value="Next" />
        </form>
      ) : (
        <form onSubmit={handleStepTwo}>
          <h2>Add units and lessons</h2>
          <div id="units" className="addedUnits">
            {units.map((unit) => {
              return (
                <div key={unit.id} className="courseUnit">
                  {unit.unit}
                  <button
                    className="removeUnitButton"
                    onClick={(e) => removeUnit(e, unit.id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={addUnit}>Add unit</button>
          <button onClick={(e) => handleGoToPreviousStep(e)}>Back</button>
          <input type="submit" value="Next" />
        </form>
      )}

      {createdCourseId === "" ? <></> : <>{navigateToCourse()}</>}
    </div>
  );
}

export default CreateCourse;
