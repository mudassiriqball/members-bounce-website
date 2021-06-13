import { all, fork } from "redux-saga/effects"

// User
import UserSaga from './auth/user/saga'

//public
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
import chatSaga from "./chat/saga"

// Notifications
import notificationSaga from './notifications/saga';

export default function* rootSaga() {
  yield all([
    // User
    UserSaga(),

    //public
    fork(AuthSaga),
    LayoutSaga(),
    chatSaga(),

    // Notifications
    notificationSaga(),
  ])
}
