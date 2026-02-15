import {
  BUY_STOCK,
  SELL_STOCK,
  GET_TRANSACTIONS,
  GET_TRANSACTION_STATS,
  TRANSACTION_ERROR
} from '../types';

const initialState = {
  transactions: [],
  stats: null,
  pagination: null,
  loading: true,
  error: null
};

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload.transactions,
        pagination: payload.pagination,
        loading: false,
        error: null
      };

    case GET_TRANSACTION_STATS:
      return {
        ...state,
        stats: payload.stats,
        loading: false,
        error: null
      };

    case BUY_STOCK:
    case SELL_STOCK:
      // Add new transaction to the beginning
      return {
        ...state,
        transactions: [payload.transaction, ...state.transactions],
        loading: false,
        error: null
      };

    case TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default transactionReducer;