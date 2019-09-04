import { StartSessionAction } from "../../Session/store/sessionActions";
import { getSessionToken } from "../../Session/store/sessionSelectors";
import { SessionTypes } from "../../Session/store/sessionTypes";
import { select, fork, takeEvery, put, delay } from "redux-saga/effects";
import { CurrentUser } from "../model/CurrentUser";
import { clearCurrentUser, setCurrentUser } from "./currentUserActions";

export default function* () {
    yield fork(getUserFromSession);
    yield takeEvery(SessionTypes.START, handleSessionStartSaga);
    yield takeEvery(SessionTypes.CLEAR, clearCurrentUserSaga);
}

function* clearCurrentUserSaga() {
    yield put(clearCurrentUser());
}

function* handleSessionStartSaga({payload}: StartSessionAction) {
    yield loadCurrentUserSaga(payload.token);
}

function* getUserFromSession() {
    const token = yield select(getSessionToken);
    if (token) {
        yield loadCurrentUserSaga(token);
    }
}

function* loadCurrentUserSaga(token: string) {
    const user: CurrentUser = {
        name: "Jan",
        surname: "Kowalski",
        email: "jan@kowalski.pl",
        userId: "0fca093a-c504-49e3-b0ed-09beabca0e8f"
    };
    yield delay(1000);
    yield put(setCurrentUser(user));
}
