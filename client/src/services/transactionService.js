import api from './api';

const transactionService = {
  // Buy stock
  buyStock: async (transactionData) => {
    const response = await api.post('/transactions/buy', transactionData);
    return response.data;
  },

  // Sell stock
  sellStock: async (transactionData) => {
    const response = await api.post('/transactions/sell', transactionData);
    return response.data;
  },

  // Get transactions
  getTransactions: async (params = {}) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  // Get transaction by ID
  getTransactionById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // Get transaction stats
  getTransactionStats: async () => {
    const response = await api.get('/transactions/stats');
    return response.data;
  },

  // Export to CSV
  exportToCSV: async () => {
    const response = await api.get('/transactions/export/csv', {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default transactionService;