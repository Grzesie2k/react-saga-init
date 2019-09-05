import { createBrowserHistory } from 'history';
import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import { compose } from "redux";
import Router from './components/Router/Router';
import withErrorScreen from "./components/ErrorScreen/withErrorScreen";
import withOfflineMask from "./hoc/withOfflineMask/withOfflineMask";
import withSession from "./hoc/withHttpSessionProvider";
import withAntdConfig from "./hoc/withAntdConfig";
import withConnectedRouter from "./hoc/withConnectedRouter";
import withHelmet from "./hoc/withHelmet";
import withReduxProvider from "./hoc/withReduxProvider";
import withRouterProvider from "./hoc/withRouterProvider";
import * as serviceWorker from './serviceWorker';
import createStore from "./store/createStore";
import preloadState from "./store/preloadState";

const debug = process.env.NODE_ENV !== "production";
const history = createBrowserHistory();
const preloadedState = preloadState();
const store = createStore(history, debug, preloadedState);

const renderer: (c: ComponentType) => ComponentType = compose(
    withReduxProvider(store),
    withErrorScreen,
    withHelmet,
    withSession,
    withRouterProvider(history),
    withConnectedRouter(history),
    withAntdConfig,
    withOfflineMask,
);

const render = () => {
    const Main = renderer(Router);

    ReactDOM.render((
        <AppContainer>
            <Main />
        </AppContainer>
    ), document.getElementById("root"));
};

if ((module as any).hot) {
    (module as any).hot.accept(`./components/Router/Router`, render);
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

