import {
  GET_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  WATCHLIST_ERROR
} from '../types';

const initialState = {
  watchlist: [],
  loading: true,
  error: null
};

const watchlistReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_WATCHLIST:
      return {
        ...state,
        watchlist: payload.watchlist,
        loading: false,
        error: null
      };

    case ADD_TO_WATCHLIST:
      return {
        ...state,
        watchlist: [...state.watchlist, payload.watchlistItem],
        loading: false,
        error: null
      };

    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          item => item.stock._id !== payload.stockId
        ),
        loading: false,
        error: null
      };

    case WATCHLIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default watchlistReducer;