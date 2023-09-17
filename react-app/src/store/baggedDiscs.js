// ---------------------- Constants --------------------------------
const LOAD_BAGGED_DISCS = "discs/LOAD_BAGGED_DISCS";
const LOAD_BAGGED_DISC = "discs/LOAD_BAGGED_DISC";

// ----------------------- Action Creators -----------------------
const loadBaggedDiscs = (discs) => ({
  type: LOAD_BAGGED_DISCS,
  payload: discs,
});

const loadBaggedDisc = (disc) => ({
  type: LOAD_BAGGED_DISC,
  payload: disc,
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

// ---------------------- Initial State ---------------------------
const initalState = {
  baggedDiscs: {},
  currentDisc: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BAGGED_DISCS:
      const baggedDiscs = {};
      action.payload.BaggedDiscs.forEach(
        (disc) => (baggedDiscs[disc.id] = disc)
      );
      return {
        ...newState,
        baggedDiscs,
      };
    case LOAD_BAGGED_DISC:
      return {
        ...newState,
        currentDisc: action.payload,
      };
    default:
      return state;
  }
}