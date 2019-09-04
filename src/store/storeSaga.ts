import { fork } from "redux-saga/effects";
import currentUserSaga from "../components/CurrentUser/store/currentUserSaga";
import sessionSaga from "../components/Session/store/sessionSaga";

export default function* () {
    yield fork(sessionSaga);
    yield fork(currentUserSaga);
}
