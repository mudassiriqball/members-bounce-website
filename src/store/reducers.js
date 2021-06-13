import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// User
import User from './auth/user/reducer'

// Authentication
import Login from "./auth/login/reducer"

//chat
import Chat from "./chat/reducer"

// Notifications
import Notifications from './notifications/reducer';

const rootReducer = combineReducers({
  // public
  User,
  Layout,
  Login,
  Chat,
  Notifications,
})

export default rootReducer
