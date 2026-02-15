import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers/rootReducer';

/**
 * Redux Store Configuration
 * 
 * What each part does:
 * - rootReducer: Combined reducers
 * - thunk: Middleware for async actions
 * - composeWithDevTools: Enable Redux DevTools in browser
 */

// Initial state (can be used for server-side rendering)
const initialState = {};

// Middleware array
const middleware = [thunk];

// Create store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;