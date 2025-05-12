import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Vehicle } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';
import AddVehicleModal from './AddVehicleModal';

const Sidebar: React.FC = () => {
  const { vehicles, selectedVehicle, selectVehicle, removeVehicle } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  const handleVehicleClick = (vehicle: Vehicle) => {
    selectVehicle(vehicle.id);
  };

  const handleDeleteVehicle = (e: React.MouseEvent, vehicleId: string) => {
    e.stopPropagation();
    setVehicleToDelete(vehicleId);
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      removeVehicle(vehicleToDelete);
      setVehicleToDelete(null);
    }
  };

  return (
    <div className="bg-gray-800 border-r border-gray-700 w-64 flex flex-col h-screen overflow-hidden">
      <div className="px-4 py-3 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold">КАТЕГОРИИ ИМУЩЕСТВА</h2>
        <button 
          className="text-green-400 hover:text-green-300 transition-colors"
          onClick={() => setIsModalOpen(true)}
          title="Добавить автомобиль"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`py-3 px-4 cursor-pointer transition-colors duration-200 flex justify-between items-center group ${
              selectedVehicle?.id === vehicle.id
                ? 'bg-gray-700'
                : 'hover:bg-gray-700'
            } ${
              vehicle.name.includes('Порш') || vehicle.name.includes('Мерс')
                ? 'border-l-2 border-red-500'
                : ''
            }`}
            onClick={() => handleVehicleClick(vehicle)}
          >
            <div className="text-white">{vehicle.name}</div>
            <button
              className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              onClick={(e) => handleDeleteVehicle(e, vehicle.id)}
              title="Удалить автомобиль"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && <AddVehicleModal onClose={() => setIsModalOpen(false)} />}
      
      {/* Delete Confirmation Modal */}
      {vehicleToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">Подтверждение удаления</h3>
            <p className="text-gray-300 mb-6">
              Вы уверены, что хотите удалить этот автомобиль? Это действие нельзя отменить.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => setVehicleToDelete(null)}
              >
                Отмена
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={confirmDelete}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;