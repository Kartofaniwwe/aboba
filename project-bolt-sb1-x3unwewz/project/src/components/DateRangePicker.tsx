import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker: React.FC = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [activeFilter, setActiveFilter] = useState('today');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    
    const now = new Date();
    
    switch (filter) {
      case 'today':
        setStartDate(now);
        setEndDate(now);
        break;
      case 'week':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        setStartDate(oneWeekAgo);
        setEndDate(now);
        break;
      case 'month':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        setStartDate(oneMonthAgo);
        setEndDate(now);
        break;
      case 'all':
        const earlyDate = new Date(2020, 0, 1);
        setStartDate(earlyDate);
        setEndDate(now);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center mb-4">
      <div className="mr-4">
        <button
          className={`px-3 py-1 rounded-lg ${
            activeFilter === 'today'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleFilterClick('today')}
        >
          Сегодня
        </button>
      </div>
      <div className="mr-4">
        <button
          className={`px-3 py-1 rounded-lg ${
            activeFilter === 'week'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleFilterClick('week')}
        >
          Неделя
        </button>
      </div>
      <div className="mr-4">
        <button
          className={`px-3 py-1 rounded-lg ${
            activeFilter === 'month'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleFilterClick('month')}
        >
          Месяц
        </button>
      </div>
      <div className="mr-4">
        <button
          className={`px-3 py-1 rounded-lg ${
            activeFilter === 'all'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleFilterClick('all')}
        >
          Всё время
        </button>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center">
        <div className="bg-gray-800 rounded-lg px-3 py-1 flex items-center mr-2">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="dd.MM.yyyy"
            className="bg-transparent border-none text-white text-sm w-24 focus:outline-none"
          />
        </div>
        <span className="text-gray-400 mx-2">-</span>
        <div className="bg-gray-800 rounded-lg px-3 py-1 flex items-center">
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            dateFormat="dd.MM.yyyy"
            className="bg-transparent border-none text-white text-sm w-24 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;