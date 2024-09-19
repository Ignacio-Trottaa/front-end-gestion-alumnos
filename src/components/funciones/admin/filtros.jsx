import React, { useState } from 'react';

export default function FilterBar({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    numero: '',
    apellidosNombres: '',
    dni: '',
    curso: '',
    telefono: '',
    localidad: '',
    correo: '',
    estado: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const newActiveFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    onApplyFilters(newActiveFilters); // Llamar a la función desde el componente Estudiantes
  };

  const clearFilters = () => {
    setFilters({
      numero: '',
      apellidosNombres: '',
      dni: '',
      curso: '',
      telefono: '',
      localidad: '',
      correo: '',
      estado: ''
    });
    onApplyFilters({}); // Limpiar los filtros también en el componente Estudiantes
  };

  return (
    <div className="p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap -mx-2">
        {Object.entries(filters).map(([key, value]) => (
          <div key={key} className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">
            {key === 'estado' ? (
              <select
                name={key}
                value={value}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            ) : (
              <input
                type={key === 'correo' ? 'email' : key === 'telefono' ? 'tel' : 'text'}
                name={key}
                value={value}
                onChange={handleFilterChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-[#06B78B]">
          Aplicar Filtros
        </button>
        <button onClick={clearFilters} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-200">
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
}
