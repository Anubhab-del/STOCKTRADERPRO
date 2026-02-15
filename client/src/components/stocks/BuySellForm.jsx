import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyStock, sellStock } from '../../redux/actions/transactionActions';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

const BuySellForm = ({ stock, onSuccess, onError }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  
  const totalAmount = quantity ? parseFloat(quantity) * stock.currentPrice : 0;
  const canAfford = user?.balance >= totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!quantity || parseFloat(quantity) < 1) {
      onError('Please enter a valid quantity');
      return;
    }

    setLoading(true);

    const transactionData = {
      stockId: stock._id,
      quantity: parseFloat(quantity),
      price: stock.currentPrice,
      type: activeTab.toUpperCase()
    };

    const action = activeTab === 'buy' ? buyStock : sellStock;
    const result = await dispatch(action(transactionData));

    setLoading(false);

    if (result.success) {
      setQuantity('');
      onSuccess(result.message);
    } else {
      onError(result.message);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'buy'
              ? 'bg-success-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'sell'
              ? 'bg-danger-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
            step="1"
            className="input-field"
            required
          />
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Price per share</span>
            <span className="font-medium">{formatCurrency(stock.currentPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Quantity</span>
            <span className="font-medium">{quantity || 0}</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="font-semibold">Total Amount</span>
            <span className="font-bold text-lg">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {activeTab === 'buy' && !canAfford && quantity && (
          <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg text-sm">
            Insufficient balance. You need {formatCurrency(totalAmount - user.balance)} more.
          </div>
        )}

        <Button
          type="submit"
          variant={activeTab === 'buy' ? 'success' : 'danger'}
          className="w-full"
          disabled={loading || (activeTab === 'buy' && !canAfford)}
        >
          {loading ? 'Processing...' : `${activeTab === 'buy' ? 'Buy' : 'Sell'} ${stock.symbol}`}
        </Button>

        <p className="text-xs text-neutral-600 text-center">
          Available Balance: {formatCurrency(user?.balance || 0)}
        </p>
      </form>
    </div>
  );
};

export default BuySellForm; 