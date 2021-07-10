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

// Randomly generate id for each new cell
function randomId() {
    return Math.random().toString(36).substr(2, 5);
}

const cellsReducer = produce(
    (state: CellsState = initialState, action: Action) => {
        switch (action.type) {
            case ActionTypes.DELETE_CELL:
                delete state.data[action.payload]; // delete the cell with the given id
                state.order.filter((id) => id !== action.payload); // filter all id that is not the given one
                return state;
            case ActionTypes.MOVE_CELL:
                const { direction } = action.payload; // direction = up | down
                const i = state.order.findIndex(
                    (id) => id === action.payload.id
                );
                const nCells = state.order.length - 1; // total cell number
                const targetIndex = direction === "up" ? i - 1 : i + 1; // up => left, down => right
                if (targetIndex < 0 || targetIndex > nCells) {
                    return state;
                }
                // Apply the standard swapping algorithm
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

                // Insert a new cell before a specific cell with a given id
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
    }
);

export default cellsReducer;
