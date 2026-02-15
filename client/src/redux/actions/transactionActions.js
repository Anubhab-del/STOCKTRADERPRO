import transactionService from '../../services/transactionService';
import {
  BUY_STOCK,
  SELL_STOCK,
  GET_TRANSACTIONS,
  GET_TRANSACTION_STATS,
  TRANSACTION_ERROR
} from '../types';

/**
 * Buy stock
 */
export const buyStock = (transactionData) => async (dispatch) => {
  try {
    const data = await transactionService.buyStock(transactionData);

    dispatch({
      type: BUY_STOCK,
      payload: data.data
    });

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Purchase failed';

    dispatch({
      type: TRANSACTION_ERROR,
      payload: message
    });

    return { success: false, message };
  }
};

/**
 * Sell stock
 */
export const sellStock = (transactionData) => async (dispatch) => {
  try {
    const data = await transactionService.sellStock(transactionData);

    dispatch({
      type: SELL_STOCK,
      payload: data.data
    });

    return { success: true, message: data.message };
  } catch (error) {
    const message = error.response?.data?.message || 'Sale failed';

    dispatch({
      type: TRANSACTION_ERROR,
      payload: message
    });

    return { success: false, message };
  }
};

/**
 * Get transactions
 */
export const getTransactions = (params) => async (dispatch) => {
  try {
    const data = await transactionService.getTransactions(params);

    dispatch({
      type: GET_TRANSACTIONS,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch transactions'
    });
  }
};

/**
 * Get transaction stats
 */
export const getTransactionStats = () => async (dispatch) => {
  try {
    const data = await transactionService.getTransactionStats();

    dispatch({
      type: GET_TRANSACTION_STATS,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch stats'
    });
  }
};