import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getProfitLossColor } from '../../utils/helpers';
import { FaArrowRight } from 'react-icons/fa';

const Portfolio = ({ holdings, summary }) => {
  if (!holdings || holdings.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-neutral-600 mb-4">You don't have any holdings yet</p>
          <Link to="/stocks">
            <button className="btn-primary">Start Trading</button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-900">Your Holdings</h2>
        <Link to="/portfolio" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
          View All <FaArrowRight />
        </Link>
      </div>

      <div className="space-y-4">
        {holdings.slice(0, 5).map((holding) => (
          <div key={holding._id} className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-neutral-900">{holding.symbol}</h3>
              <p className="text-sm text-neutral-600">{holding.quantity} shares</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">
                {formatCurrency(holding.quantity * holding.stock.currentPrice)}
              </p>
              <p className={`text-sm ${getProfitLossColor(holding.profitLossPercent)}`}>
                {formatPercent(holding.profitLossPercent)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Portfolio;