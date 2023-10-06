// ---------------------- Constants --------------------------------
const LOAD_USERS = "teepads/LOAD_USERS";
const CLEAR_USERS = "teepads/_USERS";

// ----------------------- Action Creators -----------------------
const loadUsers = (users) => ({
  type: LOAD_USERS,
  payload: users,
});

export const clearUsers = () => ({
  type: CLEAR_USERS,
});

// ----------------------- Thunk Action Creators -----------------
export const getAllUsers = () => async (dispatch) => {
  const res = await fetch(`/api/users/all`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUsers(data));
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return ["An error occured. Please try again"];
  }
};

// ---------------------- State Selectors -------------------------
export const selectAllUsers = (state) => Object.values(state.users.allUsers);

// ---------------------- Initial State ---------------------------
const initalState = {
  allUsers: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_USERS:
      const allUsers = {};
      action.payload.Users.forEach((user) => (allUsers[user.id] = user));
      return {
        ...newState,
        allUsers,
      };
    case CLEAR_USERS:
      return {
        allUsers: {},
      };
    default:
      return state;
  }
}
