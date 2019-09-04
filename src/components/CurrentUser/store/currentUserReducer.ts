import { Reducer } from "redux";
import { CurrentUser } from "../model/CurrentUser";
import { SetCurrentUserAction } from "./currentUserActions";
import { CurrentUserTypes } from "./currentUserTypes";

const currentUserReducer: Reducer<CurrentUser | null> = (state = null, action) => {
    switch (action.type as CurrentUserTypes) {
        case CurrentUserTypes.CLEAR:
            return null;
        case CurrentUserTypes.SET:
            const {payload} = action as SetCurrentUserAction;

            return payload;
    }
    return state;
};

export default currentUserReducer;
