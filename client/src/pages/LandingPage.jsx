import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStocks } from '../redux/actions/stockActions';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { getProfitLossColor } from '../utils/helpers';
import { FaChartLine, FaShieldAlt, FaMobileAlt, FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';

/**
 * Landing Page
 * 
 * Features:
 * - Hero section
 * - Market indices
 * - Trending stocks
 * - Features showcase
 * - CTA sections
 */

const LandingPage = () => {
  const dispatch = useDispatch();
  const { stocks, loading } = useSelector(state => state.stocks);
  
  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  // Mock market indices (you can replace with real data later)
  const marketIndices = [
    { name: 'NIFTY 50', value: 21850.50, change: 125.30, changePercent: 0.58 },
    { name: 'SENSEX', value: 72085.50, change: 385.20, changePercent: 0.54 },
    { name: 'BANK NIFTY', value: 45250.75, change: -95.50, changePercent: -0.21 }
  ];

  // Get trending stocks (top 6 by volume or change)
  const trendingStocks = stocks 
    ? [...stocks]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 6)
    : [];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Trade Smarter with StockTradePro
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Experience real-time stock trading with ₹1,00,000 virtual balance. 
                Learn, practice, and master the markets risk-free.
              </p>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button variant="success" size="lg" className="shadow-lg">
                    Start Trading Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-100">Virtual Balance</span>
                    <span className="text-2xl font-bold">₹1,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-100">Available Stocks</span>
                    <span className="text-2xl font-bold">{stocks?.length || 500}+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-100">Real-time Data</span>
                    <span className="text-2xl font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></span>
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Market Indices */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 overflow-x-auto">
            <h3 className="text-lg font-semibold text-neutral-700 whitespace-nowrap">
              Market Overview
            </h3>
            <div className="flex gap-8">
              {marketIndices.map((index, i) => (
                <div key={i} className="flex items-center gap-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-neutral-600">{index.name}</p>
                    <p className="text-lg font-semibold">{formatCurrency(index.value)}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${getProfitLossColor(index.change)}`}>
                    {parseFloat(index.change) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                    <span className="font-medium">{formatPercent(index.changePercent)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Stocks */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Trending Stocks Today
            </h2>
            <p className="text-neutral-600">
              Most active stocks with highest trading volume
            </p>
          </div>
          
          {loading ? (
            <Loader />
          ) : trendingStocks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingStocks.map((stock) => (
                <Card key={stock._id} hoverable>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{stock.symbol}</h3>
                      <p className="text-sm text-neutral-600">{stock.name}</p>
                    </div>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {stock.sector}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-bold text-neutral-900">
                        {formatCurrency(stock.currentPrice)}
                      </p>
                      <p className={`text-sm font-medium ${getProfitLossColor(stock.changePercent)}`}>
                        {formatPercent(stock.changePercent)}
                      </p>
                    </div>
                    <Link to={`/stocks/${stock.symbol}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600">No stocks available. Please seed the database.</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/stocks">
              <Button variant="primary" size="lg">
                View All Stocks <FaArrowRight className="inline ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Why Choose StockTradePro?
            </h2>
            <p className="text-neutral-600">
              Everything you need to master stock trading
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <FaChartLine className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
                <p className="text-neutral-600">
                  Access live stock prices and market data powered by Alpha Vantage API
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 text-success-600 rounded-full mb-4">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Risk-Free Learning</h3>
                <p className="text-neutral-600">
                  Practice with virtual money. Learn without risking real capital
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-danger-100 text-danger-600 rounded-full mb-4">
                  <FaMobileAlt className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Responsive</h3>
                <p className="text-neutral-600">
                  Trade on any device. Fully responsive design for mobile and desktop
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Trading Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of traders who are learning and growing with StockTradePro
          </p>
          <Link to="/register">
            <Button variant="success" size="lg" className="shadow-lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;