// ---------------------- Constants --------------------------------
const LOAD_BAGGED_DISCS = "discs/LOAD_BAGGED_DISCS";
const LOAD_BAGGED_DISC = "discs/LOAD_BAGGED_DISC";
const CLEAR_BAGGED_DISCS = "discs/CLEAR_BAGGED_DISCS";
const ADD_BAGGED_DISC = "discs/ADD_BAGGED_DISC";
const DELETE_BAGGED_DISC = "discs/DELETE_BAGGED_DISC";

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

const removeBaggedDisc = (id) => ({
  type: DELETE_BAGGED_DISC,
  payload: id,
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
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: disc,
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

export const deleteBaggedDisc = (id) => async (dispatch) => {
  const res = await fetch(`/api/bagged_discs/${id}`, { method: "DELETE" });
  if (res.ok) {
    dispatch(removeBaggedDisc(id));
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
export const selectDistance = (state) =>
  Object.values(state.baggedDiscs.distance);
export const selectFairway = (state) =>
  Object.values(state.baggedDiscs.fairway);
export const selectMidrange = (state) =>
  Object.values(state.baggedDiscs.midrange);
export const selectPutter = (state) => Object.values(state.baggedDiscs.putter);

// ---------------------- Initial State ---------------------------
const initalState = {
  allDiscs: {},
  currentDisc: {},
  distance: {},
  fairway: {},
  midrange: {},
  putter: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BAGGED_DISCS:
      const allDiscs = {};
      const distance = {};
      const fairway = {};
      const midrange = {};
      const putter = {};
      action.payload.BaggedDiscs.forEach((disc) => {
        allDiscs[disc.id] = disc;
        switch (disc.info.type) {
          case "Distance Driver":
            distance[disc.id] = disc;
            break;
          case "Fairway Driver":
            fairway[disc.id] = disc;
            break;
          case "Midrange":
            midrange[disc.id] = disc;
            break;
          case "Putter":
            putter[disc.id] = disc;
            break;
          default:
            allDiscs[disc.id] = disc;
        }
      });
      return {
        ...newState,
        allDiscs,
        distance,
        fairway,
        midrange,
        putter,
      };
    case LOAD_BAGGED_DISC:
      return {
        ...newState,
        currentDisc: action.payload,
      };
    case ADD_BAGGED_DISC: {
      switch (action.payload.info.type) {
        case "Distance Driver":
          newState.distance[action.payload.id] = action.payload;
          break;
        case "Fairway Driver":
          newState.fairway[action.payload.id] = action.payload;
          break;
        case "Midrange":
          newState.midrange[action.payload.id] = action.payload;
          break;
        case "Putter":
          newState.putter[action.payload.id] = action.payload;
          break;
        default:
          newState.allDiscs[action.payload.id] = action.payload;
      }
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
    case DELETE_BAGGED_DISC:
      delete newState.distance[action.payload];
      delete newState.fairway[action.payload];
      delete newState.midrange[action.payload];
      delete newState.putter[action.payload];
      delete newState.allDiscs[action.payload];
      return newState;
    default:
      return state;
  }
}
