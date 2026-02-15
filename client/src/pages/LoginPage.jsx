import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import { FaChartLine } from 'react-icons/fa';

/**
 * Login Page
 */

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const { toasts, removeToast, success } = useToast();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  const handleSuccess = (message) => {
    success(message);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-600 p-3 rounded-full">
              <FaChartLine className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-neutral-900">Welcome Back</h2>
          <p className="mt-2 text-neutral-600">
            Sign in to your StockTradePro account
          </p>
        </div>
        
        {/* Login Form Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <LoginForm onSuccess={handleSuccess} />
        </div>
        
        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;