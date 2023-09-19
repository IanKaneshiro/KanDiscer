// ---------------------- Constants --------------------------------
const LOAD_DISCS = "discs/LOAD_DISCS";
const LOAD_DISC = "discs/LOAD_DISC";
const LOAD_ADMIN_DISCS = "discs/LOAD_ADMIN_DISCS";
const ADD_DISC = "discs/ADD_DISC";
const REMOVE_DISC = "discs/REMOVE_DISC";
const APPROVE_DISC = "discs/APPROVE_DISC";

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

const addDisc = (disc) => ({
  type: ADD_DISC,
  payload: disc,
});

const removeDisc = (id) => ({
  type: REMOVE_DISC,
  payload: id,
});

const approveDisc = (id) => ({
  type: APPROVE_DISC,
  payload: id,
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

export const createNewDisc = (disc) => async (dispatch) => {
  const res = await fetch("/api/discs/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(disc),
  });
  if (res.ok) {
    const data = await res.json();
    if (data.approved) {
      dispatch(addDisc(data));
    }
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occured. Please try again."];
  }
};

export const updateDisc = (updatedDisc, id, approve) => async (dispatch) => {
  const res = await fetch(`/api/discs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDisc),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addDisc(data));
    if (approve) {
      dispatch(approveDisc(data.id));
    }
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again."];
  }
};

export const deleteDisc = (id) => async (dispatch) => {
  const res = await fetch(`/api/discs/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeDisc(id));
  } else {
    const data = await res.json();
    return data;
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
    case ADD_DISC:
      return {
        ...newState,
        allDiscs: {
          ...newState.allDiscs,
          [action.payload.id]: action.payload,
        },
      };
    case REMOVE_DISC:
      delete newState.allDiscs[action.payload];
      delete newState.awaitingApproval[action.payload];
      return {
        ...newState,
        allDiscs: newState.allDiscs,
        awaitingApproval: newState.awaitingApproval,
      };
    case APPROVE_DISC:
      delete newState.awaitingApproval[action.payload];
      return {
        ...newState,
        awaitingApproval: newState.awaitingApproval,
      };
    default:
      return state;
  }
}
