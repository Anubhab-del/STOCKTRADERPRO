import { useSelector } from 'react-redux';

/**
 * Custom hook for authentication
 * 
 * Why custom hooks:
 * - Reusable logic
 * - Cleaner components
 * - Easier testing
 */

const useAuth = () => {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  
  return {
    isAuthenticated,
    user,
    loading,
    isLoggedIn: isAuthenticated && user !== null
  };
};

export default useAuth;