import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehicle, Transaction, Statistics } from '../types';
import { generateId } from '../utils/helpers';

interface AppContextType {
  vehicles: Vehicle[];
  transactions: Transaction[];
  statistics: Statistics;
  selectedVehicle: Vehicle | null;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  removeVehicle: (id: string) => void;
  updateVehicle: (id: string, vehicle: Vehicle) => void;
  selectVehicle: (id: string | null) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

const defaultStatistics: Statistics = {
  income: 0,
  expenses: 0,
  profit: 0,
  totalHours: 0,
  totalTransactions: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Bugatti Tourbillon',
      description: 'Биллион',
      status: 'available',
      image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'Амфибия',
      status: 'available',
      image: 'https://images.pexels.com/photos/3586861/pexels-photo-3586861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      name: 'Bugatti Vivo',
      status: 'available',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statistics, setStatistics] = useState<Statistics>(defaultStatistics);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(vehicles[0]);

  useEffect(() => {
    const filteredTransactions = selectedVehicle 
      ? transactions.filter(t => t.vehicleId === selectedVehicle.id)
      : transactions;
    
    const income = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const expenses = 0;
    const totalHours = filteredTransactions.reduce((sum, t) => sum + t.hours, 0);
    
    setStatistics({
      income,
      expenses,
      profit: income - expenses,
      totalHours,
      totalTransactions: filteredTransactions.length,
    });
  }, [transactions, selectedVehicle]);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle = {
      ...vehicle,
      id: generateId(),
    };
    setVehicles(prev => [...prev, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    if (selectedVehicle && selectedVehicle.id === id) {
      setSelectedVehicle(null);
    }
  };

  const updateVehicle = (id: string, vehicle: Vehicle) => {
    setVehicles(prev => prev.map(v => v.id === id ? vehicle : v));
    if (selectedVehicle && selectedVehicle.id === id) {
      setSelectedVehicle(vehicle);
    }
  };

  const selectVehicle = (id: string | null) => {
    if (!id) {
      setSelectedVehicle(null);
      return;
    }
    const vehicle = vehicles.find(v => v.id === id);
    setSelectedVehicle(vehicle || null);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: generateId(),
      date: new Date(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const getVehicleById = (id: string) => {
    return vehicles.find(v => v.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        transactions,
        statistics,
        selectedVehicle,
        addVehicle,
        removeVehicle,
        updateVehicle,
        selectVehicle,
        addTransaction,
        getVehicleById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};