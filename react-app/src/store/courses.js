// ---------------------- Constants --------------------------------
const LOAD_COURSES = "courses/LOAD_COURSES";
const LOAD_CURRENT_COURSE = "courses/LOAD_CURRENT_COURSE";
const LOAD_ADMIN_COURSES = "courses/LOAD_ADMIN_COURSES";
const CLEAR_CURRENT_COURSE = "courses/CLEAR_CURRENT_COURSE";
const ADD_COURSE = "courses/ADD_COURSE";
const APPROVE_COURSE = "courses/APPROVE_COURSE";
const REMOVE_COURSE = "courses/REMOVE_COURSE";

// ----------------------- Action Creators -----------------------
const loadCourses = (courses) => ({
  type: LOAD_COURSES,
  payload: courses,
});

const loadCurrentCourse = (course) => ({
  type: LOAD_CURRENT_COURSE,
  payload: course,
});

const loadAdminCourses = (courses) => ({
  type: LOAD_ADMIN_COURSES,
  payload: courses,
});

const addCourse = (course) => ({
  type: ADD_COURSE,
  payload: course,
});

const removeCourse = (id) => ({
  type: REMOVE_COURSE,
  payload: id,
});

const approveCourse = (course) => ({
  type: APPROVE_COURSE,
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

export const getCoursesAwaitingApproval = () => async (dispatch) => {
  const res = await fetch("/api/courses/awaiting_approval");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAdminCourses(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const createNewCourse = (course) => async (dispatch) => {
  const res = await fetch("/api/courses/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  if (res.ok) {
    const data = await res.json();
    if (data.appoved) {
      dispatch(addCourse(data));
    }
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const updateCourse = (course, id, approve) => async (dispatch) => {
  const res = await fetch(`/api/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addCourse(data));
    if (approve) {
      dispatch(approveCourse(data));
    }
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  const res = await fetch(`/api/courses/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeCourse(id));
  } else {
    const data = await res.json();
    return data;
  }
};
// ---------------------- State Selectors -------------------------
export const allCourses = (state) => Object.values(state.courses.allCourses);
export const currentCourse = (state) => state.courses.currentCourse;
export const coursesAwaitingApproval = (state) =>
  Object.values(state.courses.awaitingApproval);

// ---------------------- Initial State ---------------------------
const initialState = {
  allCourses: {},
  currentCourse: {},
  awaitingApproval: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initialState, action) {
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
    case LOAD_ADMIN_COURSES:
      const awaitingApproval = {};
      action.payload.Courses.forEach(
        (course) => (awaitingApproval[course.id] = course)
      );
      return {
        ...newState,
        awaitingApproval,
      };
    case LOAD_CURRENT_COURSE:
      return {
        ...newState,
        currentCourse: action.payload,
      };
    case ADD_COURSE:
      return {
        ...newState,
        allCourses: {
          ...newState.allCourses,
          [action.payload.id]: action.payload,
        },
      };
    case CLEAR_CURRENT_COURSE:
      return {
        ...newState,
        currentCourse: {},
      };
    case REMOVE_COURSE:
      delete newState.allCourses[action.payload];
      delete newState.awaitingApproval[action.payload];
      return {
        ...newState,
        allCourses: newState.allCourses,
        awaitingApproval: newState.awaitingApproval,
      };
    case APPROVE_COURSE:
      delete newState.awaitingApproval[action.payload.id];
      return {
        ...newState,
        awaitingApproval: newState.awaitingApproval,
      };
    default:
      return state;
  }
}
