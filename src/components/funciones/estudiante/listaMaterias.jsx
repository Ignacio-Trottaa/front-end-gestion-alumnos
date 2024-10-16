import React, { useState } from "react";
import { materias } from "./materias";

export default function ListaMaterias() {
    const [dataMateria,setDataMateria] = useState(
        {
            id:"",
            nombre:"",
            descripcion:"",
            curso:"",
            codigo:"",
        });
    function mostrarMateria(idMateria,materia){
        setDataMateria(materia);
        console.log(dataMateria);
        console.log(idMateria);
    }
    return (
        <div className="pt-5">
            {materias.map((materia) => (
                <div 
                    className="bg-blue-400 p-4 m-2 rounded-md flex items-center justify-between" 
                    key={materia.id}
                >
                    <a href="" className="text-left">
                        <div>
                            <strong>Nombre:</strong> {materia.nombre} <br />
                            <strong>Descripción:</strong> {materia.descripcion} <br />
                            <strong>Curso:</strong> {materia.curso}
                        </div>
                    </a>
                    <div className="flex gap-2">
                        <button className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-500" 
                            onClick={()=>mostrarMateria(materia.id,materia)}>Ingresar a clase</button>
                        <button className="bg-gray-400 px-4 py-2 rounded-md hover:bg-gray-500">Salir de clase</button>
                    </div>
                </div>
            ))}
        </div>

    );
}
