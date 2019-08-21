import { takeEvery, call } from "redux-saga/effects";
import sessionPersister from "../services/sessionPersister";
import { StartSessionAction } from "./sessionActions";
import { SessionTypes } from "./sessionTypes";

export default function* sessionSaga() {
    yield takeEvery(SessionTypes.START, saveSessionDataSaga);
    yield takeEvery(SessionTypes.CLEAR, clearSessionDataSaga);
}

function* saveSessionDataSaga({payload}: StartSessionAction) {
    yield call(sessionPersister.write, payload);
}

function* clearSessionDataSaga() {
    yield call(sessionPersister.clear);
}
