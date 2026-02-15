import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import ProtectedRoute from './ProtectedRoute';

// Layout Components
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Public Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AboutPage from '../pages/AboutPage';

// Protected Pages
import DashboardPage from '../pages/DashboardPage';
import StockMarketPage from '../pages/StockMarketPage';
import StockDetailPage from '../pages/StockDetailPage';
import PortfolioPage from '../pages/PortfolioPage';
import TransactionHistoryPage from '../pages/TransactionHistoryPage';

/**
 * Application Routes
 * 
 * Defines all routes and their access levels
 */

const AppRoutes = () => {
  const dispatch = useDispatch();

  // Load user on app start if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/stocks"
            element={
              <ProtectedRoute>
                <StockMarketPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/stocks/:symbol"
            element={
              <ProtectedRoute>
                <StockDetailPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <PortfolioPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionHistoryPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default AppRoutes;