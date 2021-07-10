import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};
const reducer = produce((state: CellsState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.DELETE_CELL:
            delete state.data[action.payload];
            state.order.filter((id) => id !== action.payload);
            return state;
        case ActionTypes.MOVE_CELL:
            const { direction } = action.payload;
            const i = state.order.findIndex((id) => id === action.payload.id);
            const nCells = state.order.length - 1;
            const targetIndex = direction === "up" ? i - 1 : i + 1;
            if (targetIndex < 0 || targetIndex > nCells) {
                return state;
            }
            state.order[i] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;
        case ActionTypes.INSERT_CELL_BEFORE:
            const cell: Cell = {
                content: "",
                type: action.payload.type,
                id: randomId(),
            };
            state.data[cell.id] = cell; // add new cell to the state data
            const indexBefore = state.order.findIndex(
                (id) => id === action.payload.id
            );
            if (indexBefore < 0) {
                state.order.push(cell.id);
            } else {
                state.order.splice(indexBefore, 0, cell.id);
            }
            return state;
        case ActionTypes.UPDATE_CELL: // updating the content of the cell
            const { id, content } = action.payload;
            state.data[id].content = content;
            return state;
        default:
            return state;
    }
});

function randomId() {
    return Math.random().toString(36).substr(2, 5);
}
export default reducer;
