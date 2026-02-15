import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

/**
 * Toast Notification Component
 */

const Toast = ({ id, message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [id, onClose]);
  
  const icons = {
    success: <FaCheckCircle className="w-5 h-5 text-success-600" />,
    error: <FaExclamationCircle className="w-5 h-5 text-danger-600" />,
    warning: <FaExclamationCircle className="w-5 h-5 text-yellow-600" />,
    info: <FaInfoCircle className="w-5 h-5 text-primary-600" />
  };
  
  const bgColors = {
    success: 'bg-success-50 border-success-200',
    error: 'bg-danger-50 border-danger-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-primary-50 border-primary-200'
  };
  
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${bgColors[type]} shadow-lg animate-slide-up`}>
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-neutral-900">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded hover:bg-white/50 transition-colors"
      >
        <FaTimes className="w-4 h-4 text-neutral-500" />
      </button>
    </div>
  );
};

/**
 * Toast Container
 */
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default Toast;