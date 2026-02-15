import portfolioService from '../../services/portfolioService';
import {
  GET_PORTFOLIO,
  GET_PORTFOLIO_SUMMARY,
  PORTFOLIO_ERROR
} from '../types';

/**
 * Get user portfolio
 */
export const getPortfolio = () => async (dispatch) => {
  try {
    const data = await portfolioService.getPortfolio();

    dispatch({
      type: GET_PORTFOLIO,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch portfolio'
    });
  }
};

/**
 * Get portfolio summary
 */
export const getPortfolioSummary = () => async (dispatch) => {
  try {
    const data = await portfolioService.getPortfolioSummary();

    dispatch({
      type: GET_PORTFOLIO_SUMMARY,
      payload: data.data
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch portfolio summary'
    });
  }
};