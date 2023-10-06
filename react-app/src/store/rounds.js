// ---------------------- Constants --------------------------------
const START_ROUND = "rounds/START_ROUND";
const UPDATE_SCORE = "rounds/UPDATE_SCORE";

// ----------------------- Action Creators -----------------------
export const startRound = (players, course) => ({
  type: START_ROUND,
  players: players,
  course: course,
});

export const updateUserScore = (id, score, hole) => ({
  type: UPDATE_SCORE,
  id,
  score,
  hole,
});

// ----------------------- Thunk Action Creators -----------------

// ---------------------- State Selectors -------------------------

export const getScoresByHoleNumber = (currentHole) => (state) => {
  const players = state.rounds.players;

  const scoresByHole = Object.entries(players).map(([id, player]) => ({
    id,
    name: player.name,
    score: player.scores[currentHole],
  }));

  return scoresByHole;
};

export const getCurrentPlayer = (id) => (state) => {
  const players = state.rounds.players;
  return players[id];
};

// ---------------------- Initial State ---------------------------
const initalState = {
  course: {},
  players: {},
};

// ---------------------- Reducer ----------------------------------
export default function reducer(state = initalState, action) {
  let newState = { ...state };
  switch (action.type) {
    case START_ROUND:
      const players = {};
      newState.course = action.course;
      Object.entries(action.players).forEach(
        ([key, value]) =>
          (players[key] = {
            name: value,
            scores: {
              1: null,
              2: null,
              3: null,
              4: null,
              5: null,
              6: null,
              7: null,
              8: null,
              9: null,
              10: null,
              11: null,
              12: null,
              13: null,
              14: null,
              15: null,
              16: null,
              17: null,
              18: null,
            },
          })
      );
      return { ...newState, players };
    case UPDATE_SCORE:
      const player = newState.players[action.id];
      player.scores[action.hole] = action.score;
      return {
        ...newState,
        players: { ...newState.players, [action.id]: player },
      };
    default:
      return state;
  }
}
