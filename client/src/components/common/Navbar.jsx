import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaChartLine, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../redux/actions/authActions';
import useAuth from '../../hooks/useAuth';
import Button from './Button';

/**
 * Navigation Bar Component
 * 
 * Features:
 * - Responsive mobile menu
 * - Different nav for logged in/out users
 * - Dropdown for user menu
 */

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaChartLine className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-neutral-900">
              StockTradePro
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-neutral-700 hover:text-primary-600 font-medium">
                  Dashboard
                </Link>
                <Link to="/stocks" className="text-neutral-700 hover:text-primary-600 font-medium">
                  Markets
                </Link>
                <Link to="/portfolio" className="text-neutral-700 hover:text-primary-600 font-medium">
                  Portfolio
                </Link>
                <Link to="/transactions" className="text-neutral-700 hover:text-primary-600 font-medium">
                  Transactions
                </Link>
                <Link to="/about" className="text-neutral-700 hover:text-primary-600 font-medium">
                  About
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    <FaUser className="text-neutral-600" />
                    <span className="text-neutral-700 font-medium">{user?.name}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-danger-600 hover:bg-danger-50 flex items-center gap-2"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/about" className="text-neutral-700 hover:text-primary-600 font-medium">
                  About
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl text-neutral-700" />
            ) : (
              <FaBars className="text-2xl text-neutral-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/stocks"
                  className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Markets
                </Link>
                <Link
                  to="/portfolio"
                  className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  to="/transactions"
                  className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transactions
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-danger-600 hover:bg-danger-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;