import React from 'react';
import Card from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';

const StockWidget = ({ stock }) => {
  if (!stock) return null;

  return (
    <Card>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-neutral-600">Open</span>
          <span className="font-semibold">{formatCurrency(stock.openPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">High</span>
          <span className="font-semibold">{formatCurrency(stock.dayHigh)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">Low</span>
          <span className="font-semibold">{formatCurrency(stock.dayLow)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">Volume</span>
          <span className="font-semibold">{stock.volume?.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default StockWidget;