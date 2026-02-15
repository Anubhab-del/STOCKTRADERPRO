import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockBySymbol, clearStockDetail } from '../redux/actions/stockActions';
import { addToWatchlist } from '../redux/actions/watchlistActions';
import StockChart from '../components/stocks/StockChart';
import BuySellForm from '../components/stocks/BuySellForm';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import { formatCurrency, formatPercent, formatCompactNumber } from '../utils/formatters';
import { getProfitLossColor } from '../utils/helpers';
import { FaStar, FaArrowLeft } from 'react-icons/fa';

const StockDetailPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stockDetail, loading } = useSelector(state => state.stocks);
  const { toasts, removeToast, success, error } = useToast();
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    dispatch(getStockBySymbol(symbol));

    return () => {
      dispatch(clearStockDetail());
    };
  }, [dispatch, symbol]);

  const handleAddToWatchlist = async () => {
    if (!stockDetail) return;
    
    const result = await dispatch(addToWatchlist(stockDetail._id));
    if (result.success) {
      setInWatchlist(true);
      success(result.message);
    } else {
      error(result.message);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!stockDetail) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">Stock not found</p>
          <Button onClick={() => navigate('/stocks')}>Back to Markets</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/stocks')}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6"
        >
          <FaArrowLeft /> Back to Markets
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-neutral-900">{stockDetail.symbol}</h1>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {stockDetail.sector}
                </span>
              </div>
              <p className="text-neutral-600">{stockDetail.name}</p>
            </div>

            <Button
              variant={inWatchlist ? 'secondary' : 'outline'}
              onClick={handleAddToWatchlist}
              disabled={inWatchlist}
              className="flex items-center gap-2"
            >
              <FaStar className={inWatchlist ? 'text-yellow-500' : ''} />
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Current Price</p>
              <p className="text-2xl font-bold text-neutral-900">
                {formatCurrency(stockDetail.currentPrice)}
              </p>
              <p className={`text-sm font-medium ${getProfitLossColor(stockDetail.changePercent)}`}>
                {formatPercent(stockDetail.changePercent)} Today
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-600 mb-1">Day Range</p>
              <p className="font-semibold text-neutral-900">
                {formatCurrency(stockDetail.dayLow)} - {formatCurrency(stockDetail.dayHigh)}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-600 mb-1">52 Week Range</p>
              <p className="font-semibold text-neutral-900">
                {formatCurrency(stockDetail.fiftyTwoWeekLow)} - {formatCurrency(stockDetail.fiftyTwoWeekHigh)}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-600 mb-1">Volume</p>
              <p className="font-semibold text-neutral-900">
                {formatCompactNumber(stockDetail.volume)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart & Info - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <Card>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Price Chart (30 Days)</h2>
              <StockChart stock={stockDetail} />
            </Card>

            {/* Company Info */}
            <Card>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">About {stockDetail.name}</h2>
              <p className="text-neutral-600 leading-relaxed">
                {stockDetail.description || 'No company description available.'}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-neutral-600">Market Cap</p>
                  <p className="font-semibold text-neutral-900">
                    {stockDetail.marketCap ? formatCompactNumber(stockDetail.marketCap) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">P/E Ratio</p>
                  <p className="font-semibold text-neutral-900">
                    {stockDetail.peRatio || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Previous Close</p>
                  <p className="font-semibold text-neutral-900">
                    {formatCurrency(stockDetail.previousClose)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Open Price</p>
                  <p className="font-semibold text-neutral-900">
                    {formatCurrency(stockDetail.openPrice)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Trading Form - 1 column */}
          <div>
            <BuySellForm
              stock={stockDetail}
              onSuccess={(msg) => success(msg)}
              onError={(msg) => error(msg)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;