import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router"
import errorScreenReducer from "../components/ErrorScreen/store/errorScreenReducer";

export default (history: History) => combineReducers({
    router: connectRouter(history),
    errorScreen: errorScreenReducer,
});
