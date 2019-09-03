import { routerMiddleware } from "connected-react-router"
import { History } from "history";
import { applyMiddleware, createStore, DeepPartial, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { Task } from "redux-saga"
import { ErrorScreenType } from "../components/ErrorScreen/model/ErrorScreenType";
import { showErrorScreen } from "../components/ErrorScreen/store/errorScreenActions";
import createStoreReducer from "./createStoreReducer";
import storeSaga from "./storeSaga";
import { StoreState } from "./StoreState";

export default (history: History, debug: boolean, preloadedState: DeepPartial<StoreState>) => {
    const storeReducer = createStoreReducer(history);
    if ((module as any).hot) {
        (module as any).hot.accept("./storeSaga", () => {
            const nextStoreReducer = createStoreReducer(history);
            store.replaceReducer(nextStoreReducer);
        });
    }

    const sagaMiddleware = createSagaMiddleware({
        onError(error, errorInfo) {
            console.group("Exception in redux-saga");
            console.error(error);
            console.info(errorInfo.sagaStack);
            console.groupEnd();
            store.dispatch(showErrorScreen(ErrorScreenType.CLIENT_ERROR));
        }
    });

    if ((module as any).hot) {
        (module as any).hot.accept("./storeSaga", async () => {
            sagaTask.cancel();
            await sagaTask.toPromise().catch(() => null);
            sagaTask = sagaMiddleware.run(storeSaga)
        });
    }

    let storeEnhancer = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    ) as StoreEnhancer;

    if (debug) {
        storeEnhancer = composeWithDevTools(storeEnhancer);
    }

    const store = createStore(storeReducer, preloadedState, storeEnhancer);

    let sagaTask: Task;
    setTimeout(() => sagaTask = sagaMiddleware.run(storeSaga));

    return store;
};
