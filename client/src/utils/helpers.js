/**
 * Helper Utilities
 */

/**
 * Download blob as file
 */
export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Calculate profit/loss color class
 */
export const getProfitLossColor = (value) => {
  if (value > 0) return 'text-success-600';
  if (value < 0) return 'text-danger-600';
  return 'text-neutral-600';
};

/**
 * Get stock change indicator icon
 */
export const getStockChangeIcon = (value) => {
  if (value > 0) return '↑';
  if (value < 0) return '↓';
  return '→';
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text);
};

/**
 * Check if market is open (simplified - 9:15 AM to 3:30 PM IST, Mon-Fri)
 */
export const isMarketOpen = () => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Weekend
  if (day === 0 || day === 6) return false;
  
  // Before 9:15 AM or after 3:30 PM
  if (hours < 9 || hours > 15) return false;
  if (hours === 9 && minutes < 15) return false;
  if (hours === 15 && minutes > 30) return false;
  
  return true;
};