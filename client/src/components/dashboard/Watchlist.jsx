import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getProfitLossColor } from '../../utils/helpers';
import { removeFromWatchlist } from '../../redux/actions/watchlistActions';
import { FaTimes } from 'react-icons/fa';

const Watchlist = ({ watchlist, onRemove }) => {
  const dispatch = useDispatch();

  const handleRemove = async (stockId) => {
    const result = await dispatch(removeFromWatchlist(stockId));
    if (result.success && onRemove) {
      onRemove(result.message);
    }
  };

  if (!watchlist || watchlist.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-neutral-600 mb-4">Your watchlist is empty</p>
          <Link to="/stocks">
            <Button variant="primary">Browse Stocks</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-bold text-neutral-900 mb-6">Watchlist</h2>
      
      <div className="space-y-3">
        {watchlist.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors group"
          >
            <Link to={`/stocks/${item.symbol}`} className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-neutral-900">{item.symbol}</h3>
                  <p className="text-sm text-neutral-600">{item.stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900">
                    {formatCurrency(item.stock.currentPrice)}
                  </p>
                  <p className={`text-sm ${getProfitLossColor(item.stock.changePercent)}`}>
                    {formatPercent(item.stock.changePercent)}
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={() => handleRemove(item.stock._id)}
              className="ml-4 p-2 text-neutral-400 hover:text-danger-600 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove from watchlist"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Watchlist;