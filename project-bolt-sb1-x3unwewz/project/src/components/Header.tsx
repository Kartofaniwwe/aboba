import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 flex h-12">
      <div className="px-6 py-3">
        <span className="text-white font-medium">Аренда</span>
      </div>
      <div className="border-l border-gray-800 px-6 py-3">
        <span className="text-white font-medium">Имущества</span>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center px-4 space-x-4">
        <div className="text-green-500">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className="text-gray-400">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M15 6L21 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-gray-400">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;