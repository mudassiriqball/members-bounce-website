import { call, put, takeEvery, all } from "redux-saga/effects"

// Login Redux States
import {
  FETCH_NOTIFICATION_ACTION,
} from "./actionTypes"
import { fetchNotificationError, fetchNotificationSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getRequest } from "helpers/api_helper";
import { urls } from "helpers";
import { getDecodedToken } from "helpers/authentication";

function* fetchNotifications({ payload: { user, history } }) {
  try {
    const decoded_token = getDecodedToken();
    const response = yield call(getRequest, urls.USER_ALL_NOTIFICATION + decoded_token._id, {});
    yield all([
      yield put(fetchNotificationSuccess(response.notifications)),
    ]);
  } catch (error) {
    yield put(fetchNotificationError(error));
  }
}

function* notificationSaga() {
  yield takeEvery(FETCH_NOTIFICATION_ACTION, fetchNotifications)
}

export default notificationSaga;
