/**
 * Toast notification utility
 * Simple wrapper for displaying toast messages
 */

export const showToast = (message, type = 'info') => {
  // You can replace this with a proper toast library like react-toastify
  // For now, using browser alert as fallback
  
  const styles = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const icon = styles[type] || styles.info;
  
  // Simple console log for development
  console.log(`${icon} ${message}`);
  
  // You can add react-toastify or any other toast library here
  // For now, just using alert for critical messages
  if (type === 'error' || type === 'success') {
    alert(`${icon} ${message}`);
  }
};