import { push } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";
import sessionPersister from "../services/sessionPersister";
import { StartSessionAction } from "./sessionActions";
import { SessionTypes } from "./sessionTypes";

export default function* sessionSaga() {
    yield takeEvery(SessionTypes.START, saveSessionDataSaga);
    yield takeEvery(SessionTypes.CLEAR, clearSessionDataSaga);
}

function* saveSessionDataSaga({payload}: StartSessionAction) {
    yield call(sessionPersister.write, payload);
    yield put(push("/"));
}

function* clearSessionDataSaga() {
    yield call(sessionPersister.clear);
    yield put(push("/login"));
}
