import {
  AUTHENTICATE_USER,
  VERIFY_USER_ACTION,
  SET_LOGGED_IN,
  SET_USER,
} from "./actionTypes"

export const setIsLoggedIn = (val) => {
  return {
    type: SET_LOGGED_IN,
    payload: val,
  }
}

export const verifyUserAction = () => {
  return {
    type: VERIFY_USER_ACTION,
    payload: {},
  }
}

export const authenticateUser = (val) => {
  return {
    type: AUTHENTICATE_USER,
    payload: val,
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  }
}
