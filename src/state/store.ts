import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionTypes } from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
const state = store.getState();
store.dispatch({
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: { id: null, type: "code" },
});
