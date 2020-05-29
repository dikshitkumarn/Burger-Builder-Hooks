import { put } from "redux-saga/effects";

import * as actios from "../store/actions/index";

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actios.logoutSucceed())
}