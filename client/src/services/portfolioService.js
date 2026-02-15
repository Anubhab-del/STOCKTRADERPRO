import api from './api';

const portfolioService = {
  // Get user portfolio
  getPortfolio: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },

  // Get portfolio summary
  getPortfolioSummary: async () => {
    const response = await api.get('/portfolio/summary');
    return response.data;
  },

  // Get holding by symbol
  getHoldingBySymbol: async (symbol) => {
    const response = await api.get(`/portfolio/${symbol}`);
    return response.data;
  }
};

export default portfolioService;