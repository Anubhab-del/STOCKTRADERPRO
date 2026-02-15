import {
  GET_STOCKS,
  GET_STOCK_DETAIL,
  GET_TRENDING_STOCKS,
  GET_MARKET_INDICES,
  STOCKS_ERROR,
  CLEAR_STOCK_DETAIL,
  GET_ALL_STOCKS,
  GET_STOCK_BY_ID,
  STOCKS_LOADING
} from '../types';

/**
 * Stock Reducer
 * 
 * Manages stock data state
 */

const initialState = {
  stocks: [],
  stockDetail: null,
  stock: null,
  trendingStocks: [],
  marketIndices: [],
  pagination: null,
  loading: false,
  error: null
};

const stockReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STOCKS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_STOCKS:
      return {
        ...state,
        stocks: payload.stocks || [],
        pagination: payload.pagination,
        loading: false,
        error: null
      };

    case GET_ALL_STOCKS:
      return {
        ...state,
        stocks: payload || [],
        loading: false,
        error: null
      };

    case GET_STOCK_DETAIL:
      return {
        ...state,
        stockDetail: payload.stock || payload,
        loading: false,
        error: null
      };

    case GET_STOCK_BY_ID:
      return {
        ...state,
        stock: payload,
        stockDetail: payload,
        loading: false,
        error: null
      };

    case GET_TRENDING_STOCKS:
      return {
        ...state,
        trendingStocks: payload.stocks || payload || [],
        loading: false,
        error: null
      };

    case GET_MARKET_INDICES:
      return {
        ...state,
        marketIndices: payload.indices || payload || [],
        loading: false,
        error: null
      };

    case CLEAR_STOCK_DETAIL:
      return {
        ...state,
        stockDetail: null,
        stock: null
      };

    case STOCKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default stockReducer;