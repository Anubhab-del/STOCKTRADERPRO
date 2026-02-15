import stockService from '../../services/stockService';
import {
  GET_ALL_STOCKS,
  GET_STOCK_BY_ID,
  GET_TRENDING_STOCKS,
  GET_MARKET_INDICES,
  CLEAR_STOCK_DETAIL,
  STOCKS_LOADING,
  STOCKS_ERROR
} from '../types';

/**
 * Get all stocks
 */
export const getAllStocks = () => async (dispatch) => {
  try {
    dispatch({ type: STOCKS_LOADING });
    
    const res = await stockService.getAllStocks();

    dispatch({
      type: GET_ALL_STOCKS,
      payload: res.data.data
    });

    return { success: true, data: res.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Unable to fetch stocks';
    
    dispatch({
      type: STOCKS_ERROR,
      payload: errorMessage
    });

    return { success: false, message: errorMessage };
  }
};

/**
 * Get stock by symbol
 */
export const getStockBySymbol = (symbol) => async (dispatch) => {
  try {
    dispatch({ type: STOCKS_LOADING });
    
    const res = await stockService.getStockBySymbol(symbol);

    dispatch({
      type: GET_STOCK_BY_ID,
      payload: res.data.data
    });

    return { success: true, data: res.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Unable to fetch stock details';
    
    dispatch({
      type: STOCKS_ERROR,
      payload: errorMessage
    });

    return { success: false, message: errorMessage };
  }
};

/**
 * Get trending stocks
 */
export const getTrendingStocks = () => async (dispatch) => {
  try {
    const res = await stockService.getTrendingStocks();

    dispatch({
      type: GET_TRENDING_STOCKS,
      payload: res.data.data
    });

    return { success: true, data: res.data.data };
  } catch (error) {
    dispatch({
      type: STOCKS_ERROR,
      payload: error.response?.data?.message || 'Unable to fetch trending stocks'
    });

    return { success: false };
  }
};

/**
 * Get market indices
 */
export const getMarketIndices = () => async (dispatch) => {
  try {
    const res = await stockService.getMarketIndices();

    dispatch({
      type: GET_MARKET_INDICES,
      payload: res.data.data
    });

    return { success: true, data: res.data.data };
  } catch (error) {
    dispatch({
      type: STOCKS_ERROR,
      payload: error.response?.data?.message || 'Unable to fetch market indices'
    });

    return { success: false };
  }
};

/**
 * Clear stock detail
 */
export const clearStockDetail = () => (dispatch) => {
  dispatch({ type: CLEAR_STOCK_DETAIL });
};