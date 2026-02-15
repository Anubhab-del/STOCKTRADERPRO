import userService from '../../services/userService';
import {
  GET_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  WATCHLIST_ERROR
} from '../types';

/**
 * Get watchlist
 */
export const getWatchlist = () => async (dispatch) => {
  try {
    const data = await userService.getWatchlist();

    dispatch({
      type: GET_WATCHLIST,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: WATCHLIST_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch watchlist'
    });
  }
};

/**
 * Add to watchlist
 */
export const addToWatchlist = (stockId) => async (dispatch) => {
  try {
    const data = await userService.addToWatchlist(stockId);

    dispatch({
      type: ADD_TO_WATCHLIST,
      payload: data.data
    });

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add to watchlist';

    dispatch({
      type: WATCHLIST_ERROR,
      payload: message
    });

    return { success: false, message };
  }
};

/**
 * Remove from watchlist
 */
export const removeFromWatchlist = (stockId) => async (dispatch) => {
  try {
    const data = await userService.removeFromWatchlist(stockId);

    dispatch({
      type: REMOVE_FROM_WATCHLIST,
      payload: { stockId }
    });

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to remove from watchlist';

    dispatch({
      type: WATCHLIST_ERROR,
      payload: message
    });

    return { success: false, message };
  }
};