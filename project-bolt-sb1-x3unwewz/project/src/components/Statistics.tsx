import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';

const Statistics: React.FC = () => {
  const { statistics } = useAppContext();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <h2 className="text-xl text-white mb-4">Статистика</h2>
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm mb-1">Доход</span>
          <span className="text-white font-semibold">{formatCurrency(statistics.income)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm mb-1">Расходы</span>
          <span className="text-white font-semibold">{formatCurrency(statistics.expenses)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm mb-1">Прибыль</span>
          <span className="text-green-400 font-semibold">{formatCurrency(statistics.profit)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm mb-1">Часов аренды</span>
          <span className="text-white font-semibold">{statistics.totalHours}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm mb-1">Сделок</span>
          <span className="text-white font-semibold">{statistics.totalTransactions}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;