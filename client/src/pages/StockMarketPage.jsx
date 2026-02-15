import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStocks } from '../redux/actions/stockActions';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import SearchBar from '../components/common/SearchBar';
import StockCard from '../components/stocks/StockCard';
import StockTable from '../components/stocks/StockTable';
import { FaThLarge, FaList, FaExclamationTriangle } from 'react-icons/fa';

const StockMarketPage = () => {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector(state => state.stocks);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    console.log('Fetching stocks...');
    dispatch(getAllStocks());
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Stocks state:', { stocks, loading, error });
  }, [stocks, loading, error]);

  // Show loading state
  if (loading && (!stocks || stocks.length === 0)) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-neutral-600 mt-4">Loading stocks...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <FaExclamationTriangle className="text-6xl text-danger-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Unable to Load Stocks</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(getAllStocks())}
            className="btn-primary"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  // Show no stocks message
  if (!stocks || stocks.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <FaExclamationTriangle className="text-6xl text-warning-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">No Stocks Available</h2>
          <p className="text-neutral-600 mb-4">
            Please seed the database with stock data.
          </p>
          <p className="text-sm text-neutral-500">
            Run: <code className="bg-neutral-200 px-2 py-1 rounded">cd server && npm run seed</code>
          </p>
        </Card>
      </div>
    );
  }

  // Get unique sectors
  const sectors = ['All', ...new Set(stocks.map(stock => stock.sector))];

  // Filter stocks
  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStocks = filteredStocks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Stock Market</h1>
          <p className="text-neutral-600 mt-2">
            Browse and trade from {stocks.length} available stocks
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks by symbol or name..."
              />
            </div>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="input-field"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-3 rounded-lg ${
                  viewMode === 'table'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </Card>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-neutral-600">
            Showing {paginatedStocks.length} of {filteredStocks.length} stocks
          </p>
        </div>

        {/* Stock Display */}
        {filteredStocks.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No stocks found</p>
              <p className="text-sm text-neutral-500 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedStocks.map((stock) => (
              <StockCard key={stock._id} stock={stock} />
            ))}
          </div>
        ) : (
          <StockTable stocks={paginatedStocks} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-2 px-4">
              <span className="text-neutral-700">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockMarketPage;