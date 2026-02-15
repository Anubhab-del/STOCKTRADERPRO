import {
  GET_PORTFOLIO,
  GET_PORTFOLIO_SUMMARY,
  PORTFOLIO_ERROR
} from '../types';

const initialState = {
  holdings: [],
  summary: null,
  loading: true,
  error: null
};

const portfolioReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PORTFOLIO:
      return {
        ...state,
        holdings: payload.holdings,
        summary: payload.summary,
        loading: false,
        error: null
      };

    case GET_PORTFOLIO_SUMMARY:
      return {
        ...state,
        summary: payload,
        loading: false,
        error: null
      };

    case PORTFOLIO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default portfolioReducer;