import { routerMiddleware } from "connected-react-router"
import { History } from "history";
import { applyMiddleware, createStore, StoreEnhancer } from "redux";
import createStoreReducer from "./createStoreReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default async (history: History, debug: boolean) => {
    const storeReducer = createStoreReducer(history);
    let storeEnhancer = applyMiddleware(
        routerMiddleware(history),
    ) as StoreEnhancer;

    if (debug) {
        storeEnhancer = composeWithDevTools(storeEnhancer);
    }

    return createStore(storeReducer, storeEnhancer);
};
