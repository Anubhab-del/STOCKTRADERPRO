import React from 'react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-neutral-100">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Date</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Type</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Stock</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Quantity</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Price</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Total</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {transactions.map((txn) => (
            <tr key={txn._id} className="hover:bg-neutral-50">
              <td className="py-3 px-4 text-sm text-neutral-600">
                {formatDateTime(txn.transactionDate)}
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  txn.type === 'BUY'
                    ? 'bg-success-100 text-success-700'
                    : 'bg-danger-100 text-danger-700'
                }`}>
                  {txn.type === 'BUY' ? <FaArrowDown /> : <FaArrowUp />}
                  {txn.type}
                </span>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-semibold text-neutral-900">{txn.symbol}</p>
                  <p className="text-xs text-neutral-600">{txn.stock?.name}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-right font-medium">{txn.quantity}</td>
              <td className="py-3 px-4 text-right">{formatCurrency(txn.price)}</td>
              <td className="py-3 px-4 text-right font-semibold">{formatCurrency(txn.totalAmount)}</td>
              <td className="py-3 px-4 text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  txn.status === 'COMPLETED'
                    ? 'bg-success-100 text-success-700'
                    : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {txn.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;