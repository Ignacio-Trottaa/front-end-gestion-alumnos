import { useState, useEffect } from "react";
import React from "react";

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);

    // Hacer la solicitud a la API para obtener los datos de los estudiantes
    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await fetch('/api/estudiantes'); // Cambia la URL según la ruta de tu API
                const data = await response.json();
                setEstudiantes(data);
            } catch (error) {
                console.error("Error al obtener los estudiantes:", error);
            }
        };

        fetchEstudiantes();
    }, []);

    return (
        <div className="p-5">
            <table className="w-full">
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
                <tbody className="text-center">
                    {estudiantes.length > 0 ? (
                        estudiantes.map((estudiante) => (
                            <tr className="" key={estudiante.id}>
                                <td className="text-white bg-blue-400">{estudiante.id}</td>
                                <td className="bg-slate-200">{estudiante.nomYape}</td>
                                <td className="bg-slate-200">{estudiante.dni}</td>
                                <td className="bg-slate-200">{estudiante.curso}</td>
                                <td className="bg-slate-200">{estudiante.telefono}</td>
                                <td className="bg-slate-200">{estudiante.localidad}</td>
                                <td className="bg-slate-200">{estudiante.correoElectronico}</td>
                                <td className="bg-slate-200">{estudiante.estado}</td>
                                <td className="bg-slate-200">
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
            </table>
        </div>
    );
}
