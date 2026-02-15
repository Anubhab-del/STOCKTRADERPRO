import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../services/userService';
import { getPortfolio } from '../redux/actions/portfolioActions';
import { getAllStocks, getTrendingStocks } from '../redux/actions/stockActions';
import { getWatchlist } from '../redux/actions/watchlistActions';
import Balance from '../components/dashboard/Balance';
import Portfolio from '../components/dashboard/Portfolio';
import MarketOverview from '../components/dashboard/MarketOverview';
import Watchlist from '../components/dashboard/Watchlist';
import Loader from '../components/common/Loader';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { holdings, summary } = useSelector(state => state.portfolio);
  const { trendingStocks } = useSelector(state => state.stocks);
  const { watchlist } = useSelector(state => state.watchlist);
  const { toasts, removeToast, success, error } = useToast();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(getPortfolio()),
        dispatch(getTrendingStocks(5)),
        dispatch(getWatchlist())
      ]);
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-2">Welcome back! Here's your portfolio overview.</p>
        </div>

        <div className="space-y-6">
          {/* Balance Cards */}
          <Balance summary={summary} />

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Portfolio - 2 columns */}
            <div className="lg:col-span-2">
              <Portfolio holdings={holdings} summary={summary} />
            </div>

            {/* Watchlist - 1 column */}
            <div>
              <Watchlist 
                watchlist={watchlist} 
                onRemove={(msg) => success(msg)}
              />
            </div>
          </div>

          {/* Market Overview */}
          <MarketOverview trendingStocks={trendingStocks} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;