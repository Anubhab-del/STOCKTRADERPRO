import { combineReducers } from 'redux';
import authReducer from './authReducer';
import stockReducer from './stockReducer';
import portfolioReducer from './portfolioReducer';
import transactionReducer from './transactionReducer';
import watchlistReducer from './watchlistReducer';

/**
 * Root Reducer
 * 
 * Combines all reducers into one
 * 
 * Each key becomes a property in the state
 * e.g., state.auth, state.stocks, etc.
 */

const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stockReducer,
  portfolio: portfolioReducer,
  transactions: transactionReducer,
  watchlist: watchlistReducer
});

export default rootReducer;