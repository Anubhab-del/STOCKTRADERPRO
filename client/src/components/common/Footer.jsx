import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaChartLine } from 'react-icons/fa';

/**
 * Footer Component
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-primary-500 text-2xl" />
              <span className="text-xl font-bold">StockTradePro</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Your trusted partner in stock trading. Trade smarter, grow faster.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/stocks" className="text-neutral-400 hover:text-white">
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-neutral-400 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#facebook" className="text-neutral-400 hover:text-white">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#twitter" className="text-neutral-400 hover:text-white">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#linkedin" className="text-neutral-400 hover:text-white">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="#instagram" className="text-neutral-400 hover:text-white">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>© {currentYear} StockTradePro. All rights reserved.</p>
          <p className="mt-2">
            Disclaimer: This is a simulated trading platform for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;