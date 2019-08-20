import { combineReducers, createStore } from "redux";
import storeReducers from "./storeReducers";

export default () => createStore(() => combineReducers(storeReducers));
