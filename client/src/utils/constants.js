/**
 * Application Constants
 */

export const STOCK_SECTORS = [
  'Technology',
  'Finance',
  'Healthcare',
  'Energy',
  'Consumer Goods',
  'Industrials',
  'Telecommunications',
  'Utilities',
  'Real Estate',
  'Materials',
  'Other'
];

export const TRANSACTION_TYPES = {
  BUY: 'BUY',
  SELL: 'SELL'
};

export const CHART_INTERVALS = [
  { label: '1D', value: '1day' },
  { label: '1W', value: '1week' },
  { label: '1M', value: '1month' },
  { label: '3M', value: '3months' },
  { label: '1Y', value: '1year' }
];

export const PAGINATION_LIMIT = 10;

export const PASSWORD_STRENGTH_LABELS = [
  'Very Weak',
  'Weak',
  'Fair',
  'Good',
  'Strong'
];

export const PASSWORD_STRENGTH_COLORS = [
  'bg-danger-500',
  'bg-danger-400',
  'bg-yellow-500',
  'bg-success-400',
  'bg-success-600'
];