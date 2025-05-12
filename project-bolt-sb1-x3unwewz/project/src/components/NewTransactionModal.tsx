import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface NewTransactionModalProps {
  onClose: () => void;
  vehicleId: string;
}

const hourOptions = [
  { label: '1 час', value: 1 },
  { label: '2 часа', value: 2 },
  { label: '4 часа', value: 4 },
  { label: '6 часов', value: 6 },
  { label: '12 часов', value: 12 },
  { label: '24 часа', value: 24 },
  { label: '99 часов', value: 99 },
];

const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ onClose, vehicleId }) => {
  const { addTransaction } = useAppContext();
  const [hours, setHours] = useState(1);
  const [pricePerHour, setPricePerHour] = useState(1000);
  const [comment, setComment] = useState('');
  const [completeImmediately, setCompleteImmediately] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  
  // Calculate total amount
  const amount = hours * pricePerHour;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      vehicleId,
      hours,
      pricePerHour,
      amount,
      comment,
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            Назад
          </button>
          <h2 className="text-white text-lg font-medium">Новая сделка</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {hourOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`px-3 py-1 rounded-lg whitespace-nowrap ${
                    hours === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                  onClick={() => setHours(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="bg-gray-900 p-2 rounded-lg">
              <div className="text-gray-400 text-xs mb-1">Дата и время начала</div>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd.MM.yyyy HH:mm"
                className="bg-transparent text-white w-full focus:outline-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 p-2 rounded-lg">
              <div className="text-gray-400 text-xs mb-1">Кол-во часов:</div>
              <input
                type="number"
                className="bg-transparent text-white w-full focus:outline-none"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="bg-gray-900 p-2 rounded-lg">
              <div className="text-gray-400 text-xs mb-1">Цена за час:</div>
              <input
                type="number"
                className="bg-transparent text-white w-full focus:outline-none"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(Number(e.target.value))}
                min="0"
              />
            </div>
            <div className="bg-gray-900 p-2 rounded-lg">
              <div className="text-gray-400 text-xs mb-1">Сумма:</div>
              <div className="text-white">{formatCurrency(amount)}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="bg-gray-900 p-2 rounded-lg">
              <div className="text-gray-400 text-xs mb-1">Комментарий</div>
              <input
                type="text"
                className="bg-transparent text-white w-full focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Добавить комментарий..."
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={onClose}
            >
              Отмена
            </button>
            
            <div className="flex items-center">
              <span className="text-white mr-2">Завершить сразу</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={completeImmediately}
                  onChange={() => setCompleteImmediately(!completeImmediately)}
                  className="hidden"
                />
                <div className={`w-12 h-6 rounded-full flex items-center ${completeImmediately ? 'bg-green-500' : 'bg-gray-700'} p-1 transition-colors`}>
                  <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${completeImmediately ? 'translate-x-6' : ''}`}></div>
                </div>
              </label>
            </div>
            
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Подтвердить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;