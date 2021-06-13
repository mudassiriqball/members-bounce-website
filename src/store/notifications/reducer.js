import {
  FETCH_NOTIFICATION_ACTION,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_ERROR,
} from "./actionTypes"

const initialState = {
  notifications: null,
  error: "",
  loading: false,
  success: false,
}

const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_ACTION:
      state = {
        ...state,
        error: "",
        loading: true,
      }
      break
    case FETCH_NOTIFICATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        notifications: action.payload,
      }
      break
    case FETCH_NOTIFICATION_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Notifications;
