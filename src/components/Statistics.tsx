import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';
import { utils, writeFile } from 'xlsx';
import { Download } from 'lucide-react';

const Statistics: React.FC = () => {
  const { statistics, transactions, vehicles } = useAppContext();

  const exportToExcel = () => {
    const data = transactions.map(transaction => {
      const vehicle = vehicles.find(v => v.id === transaction.vehicleId);
      return {
        'Дата': transaction.date.toLocaleDateString(),
        'Время': transaction.date.toLocaleTimeString(),
        'Автомобиль': vehicle?.name || '',
        'Часы': transaction.hours,
        'Цена за час': transaction.pricePerHour,
        'Сумма': transaction.amount,
        'Комментарий': transaction.comment || ''
      };
    });

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Transactions');

    // Автоматическая настройка ширины столбцов
    const colWidths = Object.keys(data[0] || {}).map(key => ({
      wch: Math.max(key.length, ...data.map(row => String(row[key]).length))
    }));
    ws['!cols'] = colWidths;

    writeFile(wb, 'car-rental-transactions.xlsx');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white">Статистика</h2>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={18} />
          Экспорт в Excel
        </button>
      </div>
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