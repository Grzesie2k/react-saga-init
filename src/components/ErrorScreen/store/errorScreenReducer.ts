import { Reducer } from "redux";
import { ErrorScreenType } from "../model/ErrorScreenType";
import { ShowErrorScreenAction } from "./errorScreenActions";
import { ErrorScreenTypes } from "./errorScreenTypes";

const errorScreenReducer: Reducer<ErrorScreenType | null> = (state = null, action) => {
    switch (action.type) {
        case ErrorScreenTypes.HIDE:
            return null;
        case ErrorScreenTypes.SHOW:
            const {payload} = action as ShowErrorScreenAction;

            return payload;
    }

    return state;
};

export default errorScreenReducer;
