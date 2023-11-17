import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { authReducer } from "./user/Reducer";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
