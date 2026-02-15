import api from './api';

const userService = {
  // Get dashboard data
  getDashboardData: async () => {
    const response = await api.get('/user/dashboard');
    return response.data;
  },

  // Get watchlist
  getWatchlist: async () => {
    const response = await api.get('/user/watchlist');
    return response.data;
  },

  // Add to watchlist
  addToWatchlist: async (stockId) => {
    const response = await api.post('/user/watchlist', { stockId });
    return response.data;
  },

  // Remove from watchlist
  removeFromWatchlist: async (stockId) => {
    const response = await api.delete(`/user/watchlist/${stockId}`);
    return response.data;
  },

  // Check if in watchlist
  checkWatchlist: async (stockId) => {
    const response = await api.get(`/user/watchlist/check/${stockId}`);
    return response.data;
  }
};

export default userService;