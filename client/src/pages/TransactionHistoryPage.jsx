import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/actions/transactionActions';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilter from '../components/transactions/TransactionFilter';
import ExportButton from '../components/transactions/ExportButton';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';

const TransactionHistoryPage = () => {
  const dispatch = useDispatch();
  const { transactions, pagination, loading } = useSelector(state => state.transactions);
  const { toasts, removeToast, success, error } = useToast();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(getTransactions({ ...filters, page, limit: 10 }));
  }, [dispatch, page, filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Transaction History</h1>
            <p className="text-neutral-600 mt-2">View and manage all your trades</p>
          </div>

          <ExportButton
            onSuccess={(msg) => success(msg)}
            onError={(msg) => error(msg)}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TransactionFilter onFilter={handleFilter} />
        </div>

        {/* Transactions Table */}
        {loading ? (
          <Loader />
        ) : transactions.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <p className="text-neutral-600">No transactions found</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg border overflow-hidden mb-6">
              <TransactionTable transactions={transactions} />
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        page === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border hover:bg-neutral-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;