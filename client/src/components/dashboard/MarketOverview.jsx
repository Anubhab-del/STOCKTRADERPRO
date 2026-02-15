import React from 'react';
import Card from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getProfitLossColor } from '../../utils/helpers';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const MarketOverview = ({ trendingStocks }) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-neutral-900 mb-6">Market Overview</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-sm font-semibold text-neutral-700">Symbol</th>
              <th className="text-left py-3 text-sm font-semibold text-neutral-700">Name</th>
              <th className="text-right py-3 text-sm font-semibold text-neutral-700">Price</th>
              <th className="text-right py-3 text-sm font-semibold text-neutral-700">Change</th>
            </tr>
          </thead>
          <tbody>
            {trendingStocks.map((stock) => (
              <tr key={stock._id} className="border-b hover:bg-neutral-50">
                <td className="py-3 font-semibold text-neutral-900">{stock.symbol}</td>
                <td className="py-3 text-neutral-600 text-sm">{stock.name}</td>
                <td className="py-3 text-right font-medium">{formatCurrency(stock.currentPrice)}</td>
                <td className={`py-3 text-right font-medium ${getProfitLossColor(stock.changePercent)}`}>
                  <div className="flex items-center justify-end gap-1">
                    {parseFloat(stock.changePercent) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                    {formatPercent(stock.changePercent)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MarketOverview;