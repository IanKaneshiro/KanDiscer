// ---------------------- Constants --------------------------------
const LOAD_TEEPADS = "teepads/LOAD_TEEPADS";
const CLEAR_TEEPADS = "teepads/CLEAR_TEEPADS";

// ----------------------- Action Creators -----------------------
const loadTeepads = (teepads) => ({
  type: LOAD_TEEPADS,
  payload: teepads,
});

export const clearTeepads = () => ({
  type: CLEAR_TEEPADS,
});

// ----------------------- Thunk Action Creators -----------------
export const getTeepadsByCourseId = (courseId) => async (dispatch) => {
  const res = await fetch(`/api/courses/${courseId}/teepads`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadTeepads(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

// ---------------------- State Selectors -------------------------
export const allTeepads = (state) => Object.values(state.teepads.allTeepads);
export const getTeepadMarkers = (state) =>
  Object.values(state.teepads.allTeepads).map((teepad) => {
    return { lng: teepad.lng, lat: teepad.lat };
  });

export const getBasketMarkers = (state) =>
  Object.values(state.teepads.allTeepads).map((teepad) => {
    return { lng: teepad.baskets[0].lng, lat: teepad.baskets[0].lat };
  });
export const getHolePositions = (state) =>
  Object.values(state.teepads.allTeepads).map((teepad) => {
    return [
      { lng: teepad.lng, lat: teepad.lat },
      { lng: teepad.baskets[0].lng, lat: teepad.baskets[0].lat },
    ];
  });
export const getDottedLines = (state) => {
  const teepads = Object.values(state.teepads.allTeepads);
  return teepads.map((teepad, index) => {
    if (teepads[index + 1]?.holeNumber <= 18) {
      return [
        { lng: teepad.baskets[0].lng, lat: teepad.baskets[0].lat },
        { lng: teepads[index + 1].lng, lat: teepads[index + 1].lat },
      ];
    } else {
      return [];
    }
  });
};

// ---------------------- Initial State ---------------------------
const initalState = {
  allTeepads: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_TEEPADS:
      const allTeepads = {};
      action.payload.Teepads.forEach(
        (teepad) => (allTeepads[teepad.holeNumber] = teepad)
      );
      return {
        ...newState,
        allTeepads,
      };
    case CLEAR_TEEPADS:
      return {
        allTeepads: {},
      };
    default:
      return state;
  }
}
