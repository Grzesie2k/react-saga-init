import { routerMiddleware } from "connected-react-router"
import { History } from "history";
import { applyMiddleware, createStore, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"
import createStoreReducer from "./createStoreReducer";
import storeSaga from "./storeSaga";

export default async (history: History, debug: boolean) => {
    const storeReducer = createStoreReducer(history);
    const sagaMiddleware = createSagaMiddleware();

    let storeEnhancer = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    ) as StoreEnhancer;

    if (debug) {
        storeEnhancer = composeWithDevTools(storeEnhancer);
    }

    const store = createStore(storeReducer, storeEnhancer);

    sagaMiddleware.run(storeSaga);

    return store;
};
