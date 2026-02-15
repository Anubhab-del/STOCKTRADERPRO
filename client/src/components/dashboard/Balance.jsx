import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import { FaWallet, FaChartLine, FaCoins } from 'react-icons/fa';

const Balance = ({ summary }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <div className="flex items-center gap-4">
          <div className="bg-primary-100 p-3 rounded-full">
            <FaWallet className="text-primary-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-600">Cash Balance</p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatCurrency(summary?.cashBalance || 0)}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="bg-success-100 p-3 rounded-full">
            <FaChartLine className="text-success-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-600">Portfolio Value</p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatCurrency(summary?.totalValue || 0)}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="bg-warning-100 p-3 rounded-full">
            <FaCoins className="text-warning-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-600">Total Assets</p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatCurrency(
                parseFloat(summary?.cashBalance || 0) + parseFloat(summary?.totalValue || 0)
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Balance;