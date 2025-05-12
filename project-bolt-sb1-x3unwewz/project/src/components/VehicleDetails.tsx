import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Statistics from './Statistics';
import TransactionList from './TransactionList';
import NewTransactionModal from './NewTransactionModal';
import DateRangePicker from './DateRangePicker';
import { Pencil, X, Check } from 'lucide-react';

const VehicleDetails: React.FC = () => {
  const { selectedVehicle, updateVehicle } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(selectedVehicle?.name || '');
  const [editedDescription, setEditedDescription] = useState(selectedVehicle?.description || '');
  const [editedImage, setEditedImage] = useState(selectedVehicle?.image || '');
  const [isImageEditing, setIsImageEditing] = useState(false);
  
  if (!selectedVehicle) {
    return (
      <div className="flex-1 p-6 bg-gray-900 overflow-y-auto">
        <div className="text-white text-center mt-20">
          <p>Выберите автомобиль из списка слева</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (selectedVehicle) {
      updateVehicle(selectedVehicle.id, {
        ...selectedVehicle,
        name: editedName,
        description: editedDescription,
      });
      setIsEditing(false);
    }
  };

  const handleImageUpdate = () => {
    if (selectedVehicle) {
      updateVehicle(selectedVehicle.id, {
        ...selectedVehicle,
        image: editedImage,
      });
      setIsImageEditing(false);
    }
  };

  const handleRemoveImage = () => {
    if (selectedVehicle) {
      updateVehicle(selectedVehicle.id, {
        ...selectedVehicle,
        image: undefined,
      });
      setEditedImage('');
      setIsImageEditing(false);
    }
  };

  const startEditing = () => {
    setEditedName(selectedVehicle.name);
    setEditedDescription(selectedVehicle.description || '');
    setIsEditing(true);
  };

  return (
    <div className="flex-1 p-6 bg-gray-900 overflow-y-auto">
      <div className="flex mb-6">
        <div className="flex-1">
          {isEditing ? (
            <div>
              <h2 className="text-gray-400 text-sm">Название категории</h2>
              <input
                type="text"
                className="bg-gray-800 text-white text-2xl font-semibold px-2 py-1 rounded w-full mb-2"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <h3 className="text-gray-400 text-sm mt-2">Описание</h3>
              <textarea
                className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={3}
              />
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-400 flex items-center"
                >
                  <Check size={16} className="mr-1" />
                  Сохранить
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-red-500 hover:text-red-400 flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <h2 className="text-gray-400 text-sm">Название категории</h2>
              <h1 className="text-white text-2xl font-semibold">{selectedVehicle.name}</h1>
              {selectedVehicle.description && (
                <>
                  <h3 className="text-gray-400 text-sm mt-2">Описание</h3>
                  <p className="text-white">{selectedVehicle.description}</p>
                </>
              )}
              <button
                onClick={startEditing}
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-400"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
        </div>
        <div className="w-64 h-40 bg-gray-800 rounded-lg overflow-hidden relative group">
          {isImageEditing ? (
            <div className="p-2">
              <input
                type="url"
                className="w-full bg-gray-700 text-white rounded px-2 py-1 mb-2"
                value={editedImage}
                onChange={(e) => setEditedImage(e.target.value)}
                placeholder="URL изображения"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleImageUpdate}
                  className="text-green-500 hover:text-green-400"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setIsImageEditing(false)}
                  className="text-red-500 hover:text-red-400"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              {selectedVehicle.image ? (
                <>
                  <img 
                    src={selectedVehicle.image} 
                    alt={selectedVehicle.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setIsImageEditing(true)}
                      className="p-1 bg-gray-800 rounded-full text-white hover:bg-gray-700 mr-1"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="p-1 bg-gray-800 rounded-full text-white hover:bg-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => setIsImageEditing(true)}
                >
                  <span className="text-gray-500">Добавить изображение</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <DateRangePicker />
      <Statistics />
      <TransactionList />
      
      <div className="mt-6 flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          НОВАЯ СДЕЛКА
        </button>
      </div>
      
      {isModalOpen && (
        <NewTransactionModal 
          onClose={() => setIsModalOpen(false)} 
          vehicleId={selectedVehicle.id}
        />
      )}
    </div>
  );
};

export default VehicleDetails;