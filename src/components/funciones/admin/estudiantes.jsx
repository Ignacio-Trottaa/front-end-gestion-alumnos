import { useState, useEffect } from "react";
import React from "react";
import EstudianteService from "../../../services/estudianteServices.js";
import FilterBar from "./filtros.jsx";

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);

    useEffect(() => {
        EstudianteService.getAllEstudiantes().then(response => {
            setEstudiantes(response.data);
            setFilteredEstudiantes(response.data); // Inicialmente mostrar todos
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError("Error al obtener los estudiantes");
            setLoading(false);
        });
    }, []);

    const applyFilters = (filters) => {
        const filtered = estudiantes.filter(estudiante => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true; // Si el filtro está vacío, no lo aplicamos.
    
                const filterValue = value.trim().toLowerCase(); // Convertimos el filtro a minúsculas y eliminamos espacios
                let estudianteValue = estudiante[key] ? estudiante[key].toString().trim().toLowerCase() : '';
    
                // Si estamos buscando por número, compararemos exactamente
                if (key === 'numero') {
                    return estudiante.id.toString() === filterValue; // Comparamos el ID (número de estudiante)
                }
    
                // Comparación flexible para nombres (apellidos y nombres)
                if (key === 'apellidosNombres') {
                    const nombreCompleto = `${estudiante.apellido || ''} ${estudiante.nombre || ''}`.toLowerCase().trim();
                    return nombreCompleto.includes(filterValue);
                }
    
                // Comparación para estado (activo o inactivo)
                if (key === 'estado') {
                    return (estudiante.estado_estudiante === (filterValue === 'activo'));
                }
    
                // Comparación para teléfono (permitiendo coincidencias parciales)
                if (key === 'telefono') {
                    return estudiante.tel_personal.toString().includes(filterValue); // Teléfono puede ser numérico, por lo que lo convertimos a string
                }
    
                // Comparación para correo (permitiendo coincidencias parciales)
                if (key === 'correo') {
                    return estudiante.correo_electronico.toLowerCase().includes(filterValue);
                }
    
                // Comparaciones para otros campos (curso, localidad, etc.)
                return estudianteValue.includes(filterValue);
            });
        });
        setFilteredEstudiantes(filtered);
    };
    
    

    return (
        <div className="p-5">
            <FilterBar onApplyFilters={applyFilters} />
            <table className="w-full shadow-md mt-2">
                <thead className="text-center text-white bg-blue-500">
                    <tr>
                        <th className="p-2">N°</th>
                        <th className="p-2">Apellidos y Nombres</th>
                        <th className="p-2">DNI</th>
                        <th className="p-2">Curso</th>
                        <th className="p-2">Teléfono</th>
                        <th className="p-2">Localidad</th>
                        <th className="p-2">Correo Electrónico</th>
                        <th className="p-2">Estado</th>
                        <th className="p-2"></th>
                    </tr>
                </thead>
                {loading ? (
                    <p className="text-center">Cargando estudiantes...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <tbody className="text-center">
                        {filteredEstudiantes.length > 0 ? (
                            filteredEstudiantes.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td className={`text-white ${estudiante.estado_estudiante === false ? "bg-blue-300" : "bg-blue-500"}`}>{estudiante.id}</td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        {estudiante.apellido} {estudiante.nombre}
                                    </td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.dni}</td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>Desarrollador</td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.tel_personal}</td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.localidad}</td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.correo_electronico}</td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        {estudiante.estado_estudiante ? "Activo" : "Inactivo"}
                                    </td>
                                    <td className={`${estudiante.estado_estudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        <a href={`/admin/formulario_estudiante/${estudiante.id}`}>
                                            <i className="hover:text-blue-500">
                                                <ion-icon name="create"></ion-icon>
                                            </i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No hay estudiantes</td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
}
