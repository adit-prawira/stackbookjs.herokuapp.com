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
    order: string[];
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
                return;
            case ActionTypes.MOVE_CELL:
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
