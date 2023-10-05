// ---------------------- Constants --------------------------------

// ----------------------- Action Creators -----------------------

// ----------------------- Thunk Action Creators -----------------

// ---------------------- State Selectors -------------------------

// ---------------------- Initial State ---------------------------
const initalState = {
  users: {},
  holes: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    default:
      return state;
  }
}
