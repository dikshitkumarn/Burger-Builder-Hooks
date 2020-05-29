import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from "../store/actions/actionTypes";
import { logoutSaga } from "./auth";

// function* watchAuth() {
//     yeild takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
// };

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  }
