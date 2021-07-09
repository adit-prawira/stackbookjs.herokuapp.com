import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
    data: {
        [key: string]: Cell;
    };
    loading: boolean;
    error: string | null;
    order: string[]; // orders of existing cell id
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const cellsReducer = produce(
    (state: CellsState = initialState, action: Action): void => {
        switch (action.type) {
            case ActionTypes.DELETE_CELL:
                delete state.data[action.payload];
                state.order.filter((id) => id !== action.payload);
                return;
            case ActionTypes.MOVE_CELL:
                const { direction } = action.payload;
                const i = state.order.findIndex(
                    (id) => id === action.payload.id
                );
                const nCells = state.order.length - 1;
                const targetIndex = direction === "up" ? i - 1 : i + 1;
                if (targetIndex < 0 || targetIndex > nCells) {
                    return;
                }
                state.order[i] = state.order[targetIndex];
                state.order[targetIndex] = action.payload.id;
                return;
            case ActionTypes.INSERT_CELL_BEFORE:
                return;
            case ActionTypes.UPDATE_CELL: // updating the content of the cell
                const { id, content } = action.payload;
                state.data[id].content = content;
                return;
            default:
                return;
        }
    }
);

export default cellsReducer;
