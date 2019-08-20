import { routerMiddleware } from "connected-react-router"
import { History } from "history";
import { applyMiddleware, createStore } from "redux";
import createStoreReducer from "./createStoreReducer";

export default (history: History) => {
    const storeReducer = createStoreReducer(history);
    const storeEnhancer = applyMiddleware(
        routerMiddleware(history),
    );

    return createStore(storeReducer, storeEnhancer);
};
