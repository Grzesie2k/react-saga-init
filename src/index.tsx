import { ComponentType, createElement, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { compose } from "redux";
import App from './components/App/App';
import withConnectedRouter from "./hoc/withConnectedRouter";
import withReduxProvider from "./hoc/withReduxProvider";
import * as serviceWorker from './serviceWorker';
import createStore from "./store/createStore";
import withRouterProvider from "./hoc/withRouterProvider";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const store = createStore(history);

const renderer: (c: ComponentType) => ReactElement = compose(
    createElement,
    withReduxProvider(store),
    withRouterProvider(history),
    withConnectedRouter(history),
);

ReactDOM.render(
    renderer(App),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
