import api from './api';

const stockService = {
  getAllStocks: () => api.get('/stocks'),
  
  getStockBySymbol: (symbol) => api.get(`/stocks/symbol/${symbol}`),
  
  getStockById: (id) => api.get(`/stocks/${id}`),
  
  getTrendingStocks: () => api.get('/stocks/trending'),
  
  getMarketIndices: () => api.get('/stocks/indices'),
  
  searchStocks: (query) => api.get(`/stocks/search?q=${query}`)
};

export default stockService;