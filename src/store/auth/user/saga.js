import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { AUTHENTICATE_USER, VERIFY_USER_ACTION, } from "./actionTypes"
import { setIsLoggedIn, setUser } from "./actions"

//Include Both Helper File with needed methods
import { urls } from "../../../helpers"
import { getBearerToken, getDecodedToken } from "../../../helpers/authentication"
import { getRequest } from "../../../helpers/api_helper"

function* authenticate() {
  try {
    const decoded_token = getDecodedToken();
    if (decoded_token) {
      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(setUser(decoded_token)),
      ]);
    } else {
      yield all([
        yield put(setIsLoggedIn(false)),
        yield put(setUser(null)),
      ]);
    }
  } catch (error) {
    yield all([
      yield put(setIsLoggedIn(false)),
      yield put(setUser(null)),
    ]);
  }
}

function* verifyUser() {
  try {
    const decoded_token = getDecodedToken();
    yield all([
      yield put(setIsLoggedIn(true)),
      yield put(setUser(decoded_token)),
    ]);

    if (decoded_token) {
      const response = yield call(getRequest, urls.USER_BY_ID + decoded_token._id, {});
      yield all([
        yield put(setIsLoggedIn(true)),
        yield put(setUser(response)),
      ]);
    } else {
      yield all([
        yield put(setIsLoggedIn(false)),
        yield put(setUser(null)),
      ]);
    }
  } catch (error) {
    yield all([
      yield put(setIsLoggedIn(false)),
      yield put(setUser(null)),
    ]);
  }
}

function* UserSaga() {
  yield takeEvery(AUTHENTICATE_USER, authenticate);
  yield takeEvery(VERIFY_USER_ACTION, verifyUser);
}

export default UserSaga
