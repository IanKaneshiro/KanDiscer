import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import discs from "./discs";
import bags from "./bags";
import baggedDiscs from "./baggedDiscs";
import courses from "./courses";
import teepads from "./teepads";
import users from "./users";
import rounds from "./rounds";

const rootReducer = combineReducers({
  session,
  discs,
  bags,
  baggedDiscs,
  courses,
  teepads,
  users,
  rounds,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
