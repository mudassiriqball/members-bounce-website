import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects"
import jwt_decode from 'jwt-decode';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { saveToken } from "../../../helpers/authentication"
import { setIsLoggedIn, setUser } from "../user/actions"
import { postRequest } from "../../../helpers/api_helper";
import routeNames from "../../../routes/routeNames";
import { urls } from "../../../helpers";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postRequest, urls.LOGIN, {
      email: user.email,
      password: user.password,
    })

    saveToken(response.token);
    const _token = jwt_decode(response.token);
    yield all([
      yield put(loginSuccess(response.token)),
      yield put(setUser(_token.data)),
      yield put(setIsLoggedIn(true)),
    ]);
    history.push(routeNames.Private.Dashboard);
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    yield all([
      yield put(setUser(null)),
      yield put(setIsLoggedIn(false)),
      yield put(logoutUserSuccess())
    ]);
    history.push(routeNames.Home);
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
