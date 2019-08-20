import { call } from "redux-saga/effects";

export default function* () {
    yield call(console.log, "Hello world from redux-saga");
}
