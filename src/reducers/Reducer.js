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
    default:
      return state;
  }
};

export default Reducer;
