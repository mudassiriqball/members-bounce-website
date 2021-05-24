import {
  AUTHENTICATE_USER,
  SET_LOGGED_IN,
  SET_USER,
} from "./actionTypes"

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: null,
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      state = {
        ...state,
        loading: true,
      }
    case SET_LOGGED_IN:
      state = {
        ...state,
        isLoggedIn: action.payload,
        loading: false,
      }
      break
    case SET_USER:
      state = {
        ...state,
        user: action.payload,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state;
}

export default User;
