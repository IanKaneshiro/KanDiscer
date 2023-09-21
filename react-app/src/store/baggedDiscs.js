// ---------------------- Constants --------------------------------
const LOAD_BAGGED_DISCS = "discs/LOAD_BAGGED_DISCS";
const LOAD_BAGGED_DISC = "discs/LOAD_BAGGED_DISC";
const CLEAR_BAGGED_DISCS = "discs/CLEAR_BAGGED_DISCS";
const ADD_BAGGED_DISC = "discs/ADD_BAGGED_DISC";

// ----------------------- Action Creators -----------------------
const loadBaggedDiscs = (discs) => ({
  type: LOAD_BAGGED_DISCS,
  payload: discs,
});

const loadBaggedDisc = (disc) => ({
  type: LOAD_BAGGED_DISC,
  payload: disc,
});

const addBaggedDisc = (disc) => ({
  type: ADD_BAGGED_DISC,
  payload: disc,
});

export const clearBaggedDiscs = () => ({
  type: CLEAR_BAGGED_DISCS,
});

// ----------------------- Thunk Action Creators -----------------
export const getAllBaggedDiscs = (bagId) => async (dispatch) => {
  const res = await fetch(`/api/bags/${bagId}/bagged_discs`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadBaggedDiscs(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const getBaggedDiscById = (id) => async (dispatch) => {
  const res = await fetch(`/api/bagged_discs/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadBaggedDisc(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const createBaggedDisc = (disc, bagId, discId) => async (dispatch) => {
  const res = await fetch(
    `/api/bags/${bagId}/discs/${discId}/bagged_discs/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disc),
    }
  );

  if (res.ok) {
    const data = await res.json();
    dispatch(addBaggedDisc(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

// ---------------------- State Selectors -------------------------
export const selectAllBaggedDiscs = (state) =>
  Object.values(state.baggedDiscs.allDiscs);

// ---------------------- Initial State ---------------------------
const initalState = {
  allDiscs: {},
  currentDisc: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BAGGED_DISCS:
      const allDiscs = {};
      action.payload.BaggedDiscs.forEach((disc) => (allDiscs[disc.id] = disc));
      return {
        ...newState,
        allDiscs: allDiscs,
      };
    case LOAD_BAGGED_DISC:
      return {
        ...newState,
        currentDisc: action.payload,
      };
    case ADD_BAGGED_DISC: {
      return {
        ...newState,
        allDiscs: {
          ...newState.allDiscs,
          [action.payload.id]: action.payload,
        },
      };
    }
    case CLEAR_BAGGED_DISCS:
      return initalState;
    default:
      return state;
  }
}
