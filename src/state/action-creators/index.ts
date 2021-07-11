import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";
import {
    UpdateCellAction,
    DeleteCellAction,
    InsertCellAfterAction,
    MoveCellAction,
    DirectionTypes,
    Action,
} from "../actions";
import { Dispatch } from "redux";
import bundle from "../../bundler";

// Action Creators for CRUD and Interaction process with the text or code cells
export const moveCell = (
    id: string,
    direction: DirectionTypes
): MoveCellAction => {
    return { type: ActionTypes.MOVE_CELL, payload: { id, direction } };
};
export const deleteCell = (id: string): DeleteCellAction => {
    return { type: ActionTypes.DELETE_CELL, payload: id };
};
export const insertCellAfter = (
    id: string | null,
    type: CellTypes
): InsertCellAfterAction => {
    return { type: ActionTypes.INSERT_CELL_AFTER, payload: { id, type } };
};
export const updateCell = (id: string, content: string): UpdateCellAction => {
    return { type: ActionTypes.UPDATE_CELL, payload: { id, content } };
};

// Action Creators for bundling process
export const createBundle =
    (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionTypes.BUNDLE_START, payload: { cellId } });
        const result = await bundle(input);
        dispatch({
            type: ActionTypes.BUNDLE_COMPLETE,
            payload: {
                cellId,
                bundle: {
                    code: result.code,
                    //@ts-ignore
                    err: result.err,
                },
            },
        });
    };
