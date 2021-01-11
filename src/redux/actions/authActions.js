import {
  LOGIN_FETCHING,
  LOGIN_FULLFILLED,
  LOGIN_REJECTED,
  SET_AUTHENTICATION,
  LOGOUT_FETCHING,
  LOGOUT_FULLFILLED,
  LOGOUT_REJECTED
} from "../types/auth";
import Firebase from "../../firebase";

const loginFetching = () => {
  return {
    type: LOGIN_FETCHING
  }
};

const loginFullfilled = () => {
  return {
    type: LOGIN_FULLFILLED
  }
};

const loginRejected = () => {
  return {
    type: LOGIN_REJECTED
  }
};

export const loginWithFirebase = credentials => dispatch => {
  dispatch(loginFetching());
  return Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(async (response) => {
      const token = await response.user.getIdToken();
      localStorage.setItem('token', token);
      return dispatch(loginFullfilled());
    })
    .catch(() => {
      return dispatch(loginRejected());
    })
};

export const setAuthentication = () => {
  return {
    type: SET_AUTHENTICATION
  }
};

const logoutFetching = () => {
  return {
    type: LOGOUT_FETCHING
  }
}; 

const logoutFullfilled = (data) => {
  return {
    type: LOGOUT_FULLFILLED
  }
};

const logoutRejected = () => {
  return {
    type: LOGOUT_REJECTED
  }
};

export const logout = () => dispatch => {
  dispatch(logoutFetching());
  return Firebase.auth().signOut()
    .then(() => {
      localStorage.removeItem('token');
      return dispatch(logoutFullfilled());
    })
    .catch(() => {
      return dispatch(logoutRejected());
    })
};