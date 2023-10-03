// ---------------------- Constants --------------------------------
const LOAD_COURSES = "courses/LOAD_COURSES";
const LOAD_CURRENT_COURSE = "courses/LOAD_CURRENT_COURSE";
const CLEAR_CURRENT_COURSE = "courses/CLEAR_CURRENT_COURSE";

// ----------------------- Action Creators -----------------------
const loadCourses = (courses) => ({
  type: LOAD_COURSES,
  payload: courses,
});

const loadCurrentCourse = (course) => ({
  type: LOAD_CURRENT_COURSE,
  payload: course,
});

export const clearCurrentCourse = () => ({
  type: CLEAR_CURRENT_COURSE,
});

// ----------------------- Thunk Action Creators -----------------
export const getAllCourses = () => async (dispatch) => {
  const res = await fetch("/api/courses");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadCourses(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const getCourseById = (courseId) => async (dispatch) => {
  const res = await fetch(`/api/courses/${courseId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadCurrentCourse(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

// ---------------------- State Selectors -------------------------
export const allCourses = (state) => Object.values(state.courses.allCourses);
export const currentCourse = (state) => state.courses.currentCourse;

// ---------------------- Initial State ---------------------------
const initalState = {
  allCourses: {},
  currentCourse: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_COURSES:
      const allCourses = {};
      action.payload.Courses.forEach(
        (course) => (allCourses[course.id] = course)
      );
      return {
        ...newState,
        allCourses,
      };
    case LOAD_CURRENT_COURSE:
      return {
        ...newState,
        currentCourse: action.payload,
      };
    case CLEAR_CURRENT_COURSE:
      return {
        ...newState,
        currentCourse: {},
      };
    default:
      return state;
  }
}
