import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';
import { Transaction } from '../types';

const TransactionList: React.FC = () => {
  const { transactions, selectedVehicle } = useAppContext();
  
  const filteredTransactions = selectedVehicle
    ? transactions.filter(t => t.vehicleId === selectedVehicle.id)
    : transactions;

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="grid grid-cols-3 bg-gray-800 py-2 px-4 rounded-t-lg">
        <div className="text-gray-400">Деньги</div>
        <div className="text-gray-400">Комментарий</div>
        <div className="text-gray-400 text-right">Дата</div>
      </div>
      <div className="overflow-y-auto max-h-96">
        {filteredTransactions.map((transaction: Transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-3 border-b border-gray-700 py-3 px-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
              <span className="text-white">{formatCurrency(transaction.amount)}</span>
            </div>
            <div className="text-gray-300 truncate">
              {transaction.comment || ''}
            </div>
            <div className="text-gray-300 text-right">
              {formatDate(transaction.date)} {formatTime(transaction.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;