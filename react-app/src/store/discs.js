// ---------------------- Constants --------------------------------
const LOAD_DISCS = "discs/LOAD_DISCS";
const LOAD_DISC = "discs/LOAD_DISC";
const LOAD_ADMIN_DISCS = "discs/LOAD_ADMIN_DISCS";

// ----------------------- Action Creators -----------------------
const loadDiscs = (discs) => ({
  type: LOAD_DISCS,
  payload: discs,
});

const loadDisc = (disc) => ({
  type: LOAD_DISC,
  payload: disc,
});

const loadAdminDiscs = (discs) => ({
  type: LOAD_ADMIN_DISCS,
  payload: discs,
});

// ----------------------- Thunk Action Creators -----------------
export const getAllDiscs = () => async (dispatch) => {
  const res = await fetch("/api/discs");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadDiscs(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const getDiscById = (id) => async (dispatch) => {
  const res = await fetch(`/api/discs/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadDisc(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const getDiscsAwaitingApproval = () => async (dispatch) => {
  const res = await fetch("/api/discs/awaiting_approval");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAdminDiscs(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

// ---------------------- State Selectors -------------------------
export const allDiscs = (state) => Object.values(state.discs.allDiscs);
export const currentDisc = (state) => state.discs.currentDisc;
export const awaitingApproval = (state) =>
  Object.values(state.discs.awaitingApproval);

// ---------------------- Initial State ---------------------------
const initalState = {
  allDiscs: {},
  currentDisc: {},
  awaitingApproval: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_DISCS:
      const allDiscs = {};
      action.payload.Discs.forEach((disc) => (allDiscs[disc.id] = disc));
      return {
        ...newState,
        allDiscs,
      };
    case LOAD_ADMIN_DISCS:
      const awaitingApproval = {};
      action.payload.Discs.forEach(
        (disc) => (awaitingApproval[disc.id] = disc)
      );
      return {
        ...newState,
        awaitingApproval,
      };
    case LOAD_DISC:
      return {
        ...newState,
        currentDisc: action.payload,
      };
    default:
      return state;
  }
}
