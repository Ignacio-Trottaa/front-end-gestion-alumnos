import React, {useState, useEffect} from "react";
import ProfesoresServices from "../../../services/profesoresServices";;

export default function Profesores(){
    const [profesores,setProfesores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        ProfesoresServices.getAllProfesor().then(response=>{
            setProfesores(response.data);
            console.log(response.data)
            setLoading(false);
        }).catch(error=>{
            console.log(error);
            setError("Error al obtener los profesores");
            setLoading(false);
        });
    }, []);

    return(
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl">Listado de Profesores</h1>
            <table className="w-full shadow-md mt-2">
                <thead className="text-center text-white bg-blue-500">
                    <tr>
                        <th className="p-2">N°</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Apellido</th>
                        <th className="p-2">DNI</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Teléfono</th>
                        <th className="p-2">Materia</th>
                        <th className="p-2">Estado</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    loading ? (
                        <p className="text-center">Cargando profesores...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <tbody className="text-center">
                            {
                                profesores.map((profesor)=>(
                                <tr key={profesor.id}>
                                    <td className={`text-white ${profesor.estadoProfesor === false ? "bg-blue-300" : "bg-blue-500"}`}>{profesor.id}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.nombre}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.apellido}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.dni}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.correoElectronico}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.telefono}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.materia}</td>
                                    <td className={`${profesor.estadoProfesor ===false ? "bg-gray-400" : "bg-slate-200"}`}>{profesor.estadoProfesor ? "Activo" : "Inactivo"}</td>
                                    <td className={`${profesor.estadoProfesor === false ? "bg-gray-400" : "bg-slate-200"}`}>
                                        <a href={`/admin/formulario_profesores/${profesor.id}`}>
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