// ---------------------- Constants --------------------------------
const LOAD_BAGS = "discs/LOAD_BAGS";
const LOAD_BAG = "discs/LOAD_BAG";
const ADD_BAG = "discs/ADD_BAG";

// ----------------------- Action Creators -----------------------
const loadBags = (bags) => ({
  type: LOAD_BAGS,
  payload: bags,
});

const loadBag = (bag) => ({
  type: LOAD_BAG,
  payload: bag,
});

const addBag = (bag) => ({
  type: ADD_BAG,
  payload: bag,
});

// ----------------------- Thunk Action Creators -----------------
export const getAllBags = () => async (dispatch) => {
  const res = await fetch("/api/bags/");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadBags(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const getBagById = (id) => async (dispatch) => {
  const res = await fetch(`/api/bags/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadBag(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

export const createNewBag = (bag) => async (dispatch) => {
  const res = await fetch("/api/bags/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bag),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addBag(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

// ---------------------- State Selectors ------------------------
export const bags = (state) => Object.values(state.bags.usersBags);

// ---------------------- Initial State ---------------------------
const initalState = {
  usersBags: {},
  currentBag: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BAGS:
      const usersBags = {};
      action.payload.Bags.forEach((bag) => (usersBags[bag.id] = bag));
      return {
        ...newState,
        usersBags,
      };
    case LOAD_BAG:
      return {
        ...newState,
        currentBag: action.payload,
      };
    case ADD_BAG:
      return {
        ...newState,
        usersBags: {
          ...newState.usersBags,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
}
