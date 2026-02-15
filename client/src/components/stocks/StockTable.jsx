import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatPercent, formatCompactNumber } from '../../utils/formatters';
import { getProfitLossColor } from '../../utils/helpers';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StockTable = ({ stocks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-neutral-100">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Symbol</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Sector</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Price</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Change</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Volume</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {stocks.map((stock) => (
            <tr key={stock._id} className="hover:bg-neutral-50 transition-colors">
              <td className="py-3 px-4">
                <Link to={`/stocks/${stock.symbol}`} className="font-semibold text-primary-600 hover:text-primary-700">
                  {stock.symbol}
                </Link>
              </td>
              <td className="py-3 px-4 text-neutral-900">{stock.name}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                  {stock.sector}
                </span>
              </td>
              <td className="py-3 px-4 text-right font-medium text-neutral-900">
                {formatCurrency(stock.currentPrice)}
              </td>
              <td className={`py-3 px-4 text-right font-medium ${getProfitLossColor(stock.changePercent)}`}>
                <div className="flex items-center justify-end gap-1">
                  {parseFloat(stock.changePercent) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {formatPercent(stock.changePercent)}
                </div>
              </td>
              <td className="py-3 px-4 text-right text-neutral-600">
                {formatCompactNumber(stock.volume)}
              </td>
              <td className="py-3 px-4 text-right">
                <Link to={`/stocks/${stock.symbol}`}>
                  <button className="btn-primary text-sm">Trade</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;