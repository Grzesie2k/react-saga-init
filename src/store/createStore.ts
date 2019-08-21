import { routerMiddleware } from "connected-react-router"
import { History } from "history";
import { applyMiddleware, createStore, DeepPartial, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"
import { ErrorScreenType } from "../components/ErrorScreen/model/ErrorScreenType";
import { showErrorScreen } from "../components/ErrorScreen/store/errorScreenActions";
import createStoreReducer from "./createStoreReducer";
import storeSaga from "./storeSaga";
import { StoreState } from "./StoreState";

export default (history: History, debug: boolean, preloadedState: DeepPartial<StoreState>) => {
    const storeReducer = createStoreReducer(history);

    const sagaMiddleware = createSagaMiddleware({
        onError(error, errorInfo): void {
            console.group("Exception in redux-saga");
            console.error(error);
            console.info(errorInfo.sagaStack);
            console.groupEnd();
            store.dispatch(showErrorScreen(ErrorScreenType.CLIENT_ERROR));
        },
    });

    let storeEnhancer = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    ) as StoreEnhancer;

    if (debug) {
        storeEnhancer = composeWithDevTools(storeEnhancer);
    }

    const store = createStore(storeReducer, preloadedState, storeEnhancer);

    setTimeout(() => sagaMiddleware.run(storeSaga));

    return store;
};
