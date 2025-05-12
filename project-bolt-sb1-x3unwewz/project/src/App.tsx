import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VehicleDetails from './components/VehicleDetails';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <VehicleDetails />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;