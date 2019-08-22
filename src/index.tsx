import { ComponentType, createElement, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { compose } from "redux";
import App from './components/App/App';
import withErrorScreen from "./components/ErrorScreen/withErrorScreen";
import withOfflineMask from "./components/OfflineMask/withOfflineMask";
import withSession from "./components/Session/withSession";
import withAntdConfig from "./hoc/withAntdConfig";
import withConnectedRouter from "./hoc/withConnectedRouter";
import withHelmet from "./hoc/withHelmet";
import withReduxProvider from "./hoc/withReduxProvider";
import * as serviceWorker from './serviceWorker';
import createStore from "./store/createStore";
import withRouterProvider from "./hoc/withRouterProvider";
import { createBrowserHistory } from 'history';
import preloadState from "./store/preloadState";

const debug = process.env.NODE_ENV !== "production";
const history = createBrowserHistory();
const preloadedState = preloadState();
const store = createStore(history, debug, preloadedState);

const renderer: (c: ComponentType) => ReactElement = compose(
    createElement,
    withReduxProvider(store),
    withErrorScreen,
    withHelmet,
    withSession,
    withRouterProvider(history),
    withConnectedRouter(history),
    withAntdConfig,
    withOfflineMask,
);

ReactDOM.render(
    renderer(App),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

