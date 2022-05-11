import Reducer from "../reducers/Reducer";
import { createContext, useReducer } from "react";

const initialState = {
  course: "",
  currentCourse: {},
  createCourseSwitch: false,
  createdCourseLessons: [],
  createdCourseUnits: [],
};

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default GlobalState;
