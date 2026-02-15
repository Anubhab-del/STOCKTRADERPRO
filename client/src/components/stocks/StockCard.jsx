import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getProfitLossColor, getStockChangeIcon } from '../../utils/helpers';

const StockCard = ({ stock }) => {
  return (
    <Link to={`/stocks/${stock.symbol}`}>
      <Card hoverable>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">{stock.symbol}</h3>
            <p className="text-sm text-neutral-600 truncate">{stock.name}</p>
          </div>
          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
            {stock.sector}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {formatCurrency(stock.currentPrice)}
              </p>
              <p className={`text-sm font-medium flex items-center gap-1 ${getProfitLossColor(stock.changePercent)}`}>
                <span>{getStockChangeIcon(stock.changePercent)}</span>
                {formatPercent(stock.changePercent)}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Volume</span>
              <span className="font-medium">{stock.volume?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StockCard;