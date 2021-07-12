import produce from "immer";
import { ActionTypes } from "../action-types/index";
import { Action } from "../actions/index";
interface BundleState {
    [key: string]:
        | {
              loading: boolean;
              code: string;
              err: string;
          }
        | undefined;
}

const initialState: BundleState = {};

const bundleReducer = produce(
    (state: BundleState = initialState, action: Action): BundleState => {
        switch (action.type) {
            case ActionTypes.BUNDLE_START:
                // set loading to true, and let code and error to be empty string
                // as it will indicate bundling process loading screen
                state[action.payload.cellId] = {
                    loading: true,
                    code: "",
                    err: "",
                };
                return state;
            case ActionTypes.BUNDLE_COMPLETE:
                // set loading to false to indicate a finished bundling process
                // and put the new code and error value to the store
                const { code, err } = action.payload.bundle;
                state[action.payload.cellId] = { loading: false, code, err };
                return state;
            default:
                return state;
        }
    }
);

export default bundleReducer;
