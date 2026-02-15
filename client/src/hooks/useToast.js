import { useState, useCallback } from 'react';

/**
 * Custom hook for toast notifications
 */

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);
  
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  return {
    toasts,
    showToast,
    removeToast,
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    info: (message) => showToast(message, 'info'),
    warning: (message) => showToast(message, 'warning')
  };
};

export default useToast;