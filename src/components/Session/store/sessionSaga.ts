import { push } from "connected-react-router";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { getCurrentPathname } from "../../App/store/appSelectors";
import sessionPersister from "../services/sessionPersister";
import { StartSessionAction } from "./sessionActions";
import { hasSession } from "./sessionSelectors";
import { SessionTypes } from "./sessionTypes";

export default function* sessionSaga() {
    const isLoggedIn = yield select(hasSession);
    const isLoginPage = (yield select(getCurrentPathname)) === "/login";

    if (isLoggedIn === isLoginPage) {
        yield put(push(isLoginPage ? "/" : "/login"));
    }

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
