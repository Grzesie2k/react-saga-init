import { Reducer } from "redux";
import { SessionData } from "../model/SessionData";
import { StartSessionAction } from "./sessionActions";
import { SessionTypes } from "./sessionTypes";

type State = null | SessionData

const sessionReducer: Reducer<State> = (state = null, action) => {
    switch (action.type as SessionTypes) {
        case SessionTypes.START: {
            const {payload} = action as StartSessionAction;
            return payload;
        }
        case SessionTypes.CLEAR: {
            return null;
        }
    }

    return state;
};

export default sessionReducer;
