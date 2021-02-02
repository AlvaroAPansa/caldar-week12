import {
  LOGIN_FETCHING,
  LOGIN_FULLFILLED,
  LOGIN_REJECTED,
  SET_AUTHENTICATION,
  LOGOUT_FETCHING,
  LOGOUT_FULLFILLED,
  LOGOUT_REJECTED
} from "../types/auth";

const initialState = {
  isLoading: false,
  error: false,
  authenticated: false
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case LOGOUT_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case LOGOUT_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        authenticated: false
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: true
      };
    default:
      return state;
  }
};

export default authReducers;