import React , { useState, useEffect } from "react";
import EstudianteService from "../../../services/estudianteServices.js";

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        EstudianteService.getAllEstudiantes().then(response => {
            setEstudiantes(response.data);
            console.log(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError("Error al obtener los estudiantes");
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl">Listado de Estudiantes</h1>
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
                        {
                            estudiantes.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td className={`text-white ${estudiante.estadoEstudiante === false ? "bg-blue-300" : "bg-blue-500"}`}>{estudiante.id}</td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        {estudiante.apellido} {estudiante.nombre}
                                    </td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.dni}</td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>Desarrollador</td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.telefonoPersonal}</td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.localidad}</td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>{estudiante.correoElectronico}</td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        {estudiante.estadoEstudiante ? "Activo" : "Inactivo"}
                                    </td>
                                    <td className={`${estudiante.estadoEstudiante === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        <a href={`/admin/formulario_estudiante/${estudiante.id}`}>
                                            <i className="hover:text-blue-500">
                                                <ion-icon name="create"></ion-icon>
                                            </i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                )}
            </table>
        </div>
    );
}
