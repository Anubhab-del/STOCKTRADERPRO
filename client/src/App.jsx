import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

/**
 * Main App Component
 * 
 * Root component that wraps the entire application
 * Sets up routing with BrowserRouter
 */

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;