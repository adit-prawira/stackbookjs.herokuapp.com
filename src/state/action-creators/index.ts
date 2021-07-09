import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";

import {
    Action,
    UpdateCellAction,
    DeleteCellAction,
    InsertCellBeforeAction,
    MoveCellAction,
    DirectionTypes,
} from "../actions";

export const moveCell = (
    id: string,
    direction: DirectionTypes
): MoveCellAction => {
    return { type: ActionTypes.MOVE_CELL, payload: { id, direction } };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return { type: ActionTypes.DELETE_CELL, payload: id };
};
export const insertCellBefore = (
    id: string,
    type: CellTypes
): InsertCellBeforeAction => {
    return { type: ActionTypes.INSERT_CELL_BEFORE, payload: { id, type } };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return { type: ActionTypes.UPDATE_CELL, payload: { id, content } };
};
