import { fork } from "redux-saga/effects";
import sessionSaga from "../components/Session/store/sessionSaga";

export default function* () {
    yield fork(sessionSaga);
}
