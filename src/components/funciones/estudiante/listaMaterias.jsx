import React, { useEffect, useState } from "react";
import estudianteServices from "../../../services/estudianteServices";
import inscripcionServices from "../../../services/inscripcionServices";
import { toast } from "react-toastify";

export default function ListaMaterias({onMateriaSeleccionada}) {
    const [Alumno,setIdAlumno] = useState({
        id: 2 //sesion del alumno
    })
    const [dataMateria,setDataMateria] = useState([]);
    
    const [selectedMaterias, setSelectedMaterias] = useState(null);

    const handleSelectMateria = (materia) => {
        onMateriaSeleccionada(materia);
    };

    const desincribirse = (e,idMateria) =>{
        e.preventDefault();
            inscripcionServices.desinscribirse(Alumno.id, idMateria).then((response)=>{
                setTimeout(() => {
                    location.reload()    
                }, 2500);
                toast.success("¡Saliste de la clase correctamente!")
            }).catch(error=>{
                console.log(error);
            })
    }
    useEffect(()=>{
        estudianteServices.allMateriasByAlumno(Alumno.id).then((response)=>{
            setDataMateria(response.data);
            console.log(response.data)
        }).catch(error=>{
            console.log(error);
        })
    },[]);
    
    return (
        <div className="pt-5">
            {
                dataMateria.map((materia) => (
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
                                    onClick={()=>handleSelectMateria(materia)}>Ingresar a clase</button>
                                <button className="bg-gray-400 px-4 py-2 rounded-md hover:bg-gray-500"
                                    onClick={(e)=>desincribirse(e,materia.id)}>Salir de clase</button>
                            </div>
                        </div>
                    ))
                
            }
        </div>
    );
}
