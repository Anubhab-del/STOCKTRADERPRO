import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  UPDATE_PROFILE
} from '../types';

/**
 * Auth Reducer
 * 
 * Manages authentication state
 * 
 * State structure:
 * - token: JWT token from backend
 * - isAuthenticated: boolean flag
 * - loading: true while checking auth
 * - user: user object from backend
 */

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // Save token to localStorage
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      };

    case LOAD_USER:
    case UPDATE_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      // Clear token from localStorage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };

    default:
      return state;
  }
};

export default authReducer;