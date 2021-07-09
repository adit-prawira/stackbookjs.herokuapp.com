import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { ActionTypes } from "./action-types";
export const store = createStore(reducers, applyMiddleware(reduxThunk));

store.dispatch({
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: "code",
    },
});
store.dispatch({
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: "text",
    },
});
console.log(store.getState());
