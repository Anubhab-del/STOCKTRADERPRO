import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPortfolio } from '../redux/actions/portfolioActions';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { getProfitLossColor } from '../utils/helpers';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const { holdings, summary, loading } = useSelector(state => state.portfolio);

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  if (loading) {
    return <Loader fullScreen />;
  }

  // Prepare pie chart data
  const pieData = {
    labels: holdings.map(h => h.symbol),
    datasets: [{
      data: holdings.map(h => h.quantity * h.stock.currentPrice),
      backgroundColor: [
        '#0ea5e9', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6',
        '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
      ],
    }]
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Portfolio</h1>
          <p className="text-neutral-600 mt-2">Track your holdings and performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <p className="text-sm text-neutral-600 mb-2">Total Invested</p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatCurrency(summary?.totalInvested || 0)}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-neutral-600 mb-2">Current Value</p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatCurrency(summary?.totalValue || 0)}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-neutral-600 mb-2">Profit/Loss</p>
            <p className={`text-2xl font-bold ${getProfitLossColor(summary?.profitLoss)}`}>
              {formatCurrency(summary?.profitLoss || 0)}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-neutral-600 mb-2">Returns</p>
            <p className={`text-2xl font-bold ${getProfitLossColor(summary?.profitLossPercent)}`}>
              {formatPercent(summary?.profitLossPercent || 0)}
            </p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Your Holdings</h2>
              
              {holdings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-600 mb-4">You don't have any holdings yet</p>
                  <Link to="/stocks">
                    <button className="btn-primary">Start Trading</button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Stock</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Qty</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Avg Price</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Current</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Value</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">P&L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {holdings.map(holding => (
                        <tr key={holding._id} className="hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <Link to={`/stocks/${holding.symbol}`} className="font-semibold text-primary-600 hover:text-primary-700">
                              {holding.symbol}
                            </Link>
                            <p className="text-xs text-neutral-600">{holding.stock.name}</p>
                          </td>
                          <td className="py-3 px-4 text-right">{holding.quantity}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(holding.averagePrice)}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(holding.stock.currentPrice)}</td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {formatCurrency(holding.quantity * holding.stock.currentPrice)}
                          </td>
                          <td className={`py-3 px-4 text-right font-semibold ${getProfitLossColor(holding.profitLossPercent)}`}>
                            <div>{formatCurrency(holding.profitLoss)}</div>
                            <div className="text-xs">{formatPercent(holding.profitLossPercent)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {/* Portfolio Distribution */}
          <div>
            <Card>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Distribution</h2>
              
              {holdings.length > 0 ? (
                <div className="h-64">
                  <Pie 
                    data={pieData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              ) : (
                <p className="text-neutral-600 text-center py-12">
                  No holdings to display
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;