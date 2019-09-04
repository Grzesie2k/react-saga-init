import { connectRouter } from "connected-react-router"
import { History } from "history";
import { combineReducers } from "redux";
import currentUserReducer from "../components/CurrentUser/store/currentUserReducer";
import errorScreenReducer from "../components/ErrorScreen/store/errorScreenReducer";
import sessionReducer from "../components/Session/store/sessionReducer";

export default (history: History) => combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    errorScreen: errorScreenReducer,
    currentUser: currentUserReducer,
});
