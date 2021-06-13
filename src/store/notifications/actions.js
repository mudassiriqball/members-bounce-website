import {
  FETCH_NOTIFICATION_ACTION,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_ERROR,
} from "./actionTypes"

export const fetchNotificationAction = () => {
  return {
    type: FETCH_NOTIFICATION_ACTION,
    payload: {},
  }
}

export const fetchNotificationSuccess = data => {
  return {
    type: FETCH_NOTIFICATION_SUCCESS,
    payload: data,
  }
}

export const fetchNotificationError = error => {
  return {
    type: FETCH_NOTIFICATION_ERROR,
    payload: error,
  }
}
