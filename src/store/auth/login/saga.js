import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects"
import jwt_decode from 'jwt-decode';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { saveToken } from "helpers/authentication"
import { setIsLoggedIn, setUser } from "../user/actions"
import { postRequest } from "helpers/api_helper";
import routeNames from "routes/routeNames";

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postRequest, {
      email: user.email,
      password: user.password,
    })

    saveToken(response.token);
    const _token = jwt_decode(response.token);

    yield all([
      yield put(loginSuccess(response.token)),
      yield put(setUser(_token)),
      yield put(setIsLoggedIn(true)),
    ]);
    history.push(routeNames.Dashboard);
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push(routeNames.Home)
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
