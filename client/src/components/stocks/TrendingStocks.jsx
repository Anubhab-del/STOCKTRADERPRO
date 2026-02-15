import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getProfitLossColor } from '../../utils/helpers';

const TrendingStocks = ({ stocks }) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-neutral-900 mb-6">🔥 Trending Today</h2>
      
      <div className="space-y-3">
        {stocks.map((stock, index) => (
          <Link
            key={stock._id}
            to={`/stocks/${stock.symbol}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900">{stock.symbol}</p>
              <p className="text-sm text-neutral-600 truncate">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">{formatCurrency(stock.currentPrice)}</p>
              <p className={`text-sm ${getProfitLossColor(stock.changePercent)}`}>
                {formatPercent(stock.changePercent)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default TrendingStocks;