import authService from '../../services/authService';
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
 * Redux Actions for Authentication
 * 
 * These are "action creators" - functions that return actions
 * Redux-thunk allows us to return functions (for async operations)
 */

/**
 * Register user
 */
export const register = (userData) => async (dispatch) => {
  try {
    const data = await authService.register(userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.data
    });

    // Load user after registration
    dispatch(loadUser());

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';

    dispatch({
      type: REGISTER_FAIL,
      payload: message
    });

    return { success: false, message };
  }
};

/**
 * Login user
 */
export const login = (credentials) => async (dispatch) => {
  try {
    const data = await authService.login(credentials);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data
    });

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';

    dispatch({
      type: LOGIN_FAIL,
      payload: message
    });

    return { success: false, message };
  }
};

/**
 * Load user (get current user info)
 */
export const loadUser = () => async (dispatch) => {
  try {
    const data = await authService.loadUser();

    dispatch({
      type: LOAD_USER,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

/**
 * Logout user
 */
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

/**
 * Update profile
 */
export const updateProfile = (userData) => async (dispatch) => {
  try {
    const data = await authService.updateProfile(userData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data.data
    });

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Update failed';
    return { success: false, message };
  }
};