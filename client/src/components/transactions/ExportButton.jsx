import React, { useState } from 'react';
import transactionService from '../../services/transactionService';
import Button from '../common/Button';
import { downloadBlob } from '../../utils/helpers';
import { FaDownload } from 'react-icons/fa';

const ExportButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const blob = await transactionService.exportToCSV();
      downloadBlob(blob, `transactions_${Date.now()}.csv`);
      onSuccess('Transactions exported successfully');
    } catch (error) {
      onError('Failed to export transactions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="secondary"
      disabled={loading}
      className="flex items-center gap-2"
    >
      <FaDownload />
      {loading ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
};

export default ExportButton;