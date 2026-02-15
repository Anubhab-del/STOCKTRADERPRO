import React, { useState } from 'react';
import Button from '../common/Button';

const TransactionFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    symbol: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      type: '',
      symbol: '',
      startDate: '',
      endDate: ''
    });
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
      <h3 className="font-semibold text-neutral-900 mb-4">Filter Transactions</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Transaction Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </div>

        <div>
          <label className="label">Stock Symbol</label>
          <input
            type="text"
            name="symbol"
            value={filters.symbol}
            onChange={handleChange}
            placeholder="e.g., AAPL"
            className="input-field"
          />
        </div>

        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="primary">
          Apply Filters
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default TransactionFilter;