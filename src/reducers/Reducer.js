const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSE":
      return {
        ...state,
        course: action.payload,
      };
    case "SET_CURRENT_COURSE":
      return {
        ...state,
        currentCourse: action.payload,
      };
    case "CREATE_COURSE":
      return {
        ...state,
        createCourseSwitch: [action.payload],
      };
    case "CREATE_COURSE_ADD_LESSON":
      return {
        ...state,
        createdCourseLessons: [...state.createdCourseLessons, action.payload],
      };
    case "CREATE_COURSE_ADD_UNIT":
      return {
        ...state,
        createdCourseUnits: [...state.createdCourseUnits, action.payload],
      };
    default:
      return state;
  }
};

export default Reducer;
