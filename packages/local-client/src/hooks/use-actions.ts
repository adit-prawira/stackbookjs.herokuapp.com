import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useMemo } from "react";
export const useActions = () => {
    const dispatch = useDispatch();
    // call bind action creators only 1 time or if there is changes on the dispatch
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);
    }, [dispatch]);
};
