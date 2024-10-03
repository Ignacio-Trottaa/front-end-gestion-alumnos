import { useState } from "react";
import React from "react";
import SidebarProfesor from "../layout/SidebarProfesor";
import FormMateria from "../funciones/profesor/formMateria";

export default function ProfesorDashboard() {
    // Estado para las materias
    const [materias, setMaterias] = useState([]);
    const [selectedMaterias,setSelectedMaterias] = useState(null);
    const [formMateria,setFormMateria] = useState(false);
    // Función para agregar una nueva materia
    const agregarMateria = (nuevaMateria) => {
        setMaterias([...materias, nuevaMateria]);
    };

    // Función para seleccionar una materia
    const handleMateriaClick = (materia) => {
        setSelectedMaterias(materia);
        setFormMateria(false);
    }

    const onFormMateria = ()=>{
        setSelectedMaterias(null);
        setFormMateria(true);
    }

    const [publicacion,setPublicacion]=useState({
        comment:"",
        file:""
    });
    return (
        <div className="flex">
            {/* Pasamos las materias y la función agregarMateria como props */}
            <SidebarProfesor materias={materias} onMateriaClick={handleMateriaClick} onFormMateria={onFormMateria}/>
            <div className="ml-64 w-full">
                {
                    formMateria ? (
                        <FormMateria agregarMateria={ agregarMateria }/>
                    ) : selectedMaterias ? (
                    <div className="p-5 bg-white border h-full">
                        <div className="m-5 bg-blue-300 w-75% h-40 rounded-md">
                            <div className="p-5">
                            <h3 className="text-lg font-bold">Materia: {selectedMaterias.nombre}</h3>
                            <p>Descripción: {selectedMaterias.descripcion}</p>
                            <p>Año: {selectedMaterias.curso}° Año</p>
                            <p>Codigo: {selectedMaterias.codigo}</p>
                            </div>
                        </div>
                        {/*Publicar cosas*/}
                        <div className="mt-4 rounded-md shadow-lg ">
                            <form method="post">
                                <input type="text" name="comment" id="comment" className="w-full p-2 border rounded-t outline-none" 
                                placeholder="Comenta algo a la clase"/>
                                <input type="file" name="file" id="file" className="w-full p-2 border rounded-b"/>
                                {/*deshabilitar boton si no hay imagen y ni mensaje */}
                                <input type="submit" value="Publicar" className="w-full p-2 bg-blue-500 text-white rounded-b hover:bg-[#06B78B] cursor-pointer"/>
                            </form>
                        </div>
                        {/*Publicaciones*/}
                        <div className="mt-4 rounded-md shadow-lg border-2">
                            <div className="p-5">
                                <h4>Nombre de usuario y hora</h4>
                                <p>Comentario</p>
                            </div>
                            <div className="p-3">
                                <div className="flex">
                                <input type="text" name="responder" id="responder" className="w-full p-3 border outline-none rounded-full mr-3"
                                placeholder="Añade un comentario a la publicación"/>
                                <button className="w-10 h-10 m-auto rounded-full hover:bg-slate-300"><i><ion-icon name="send"></ion-icon></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                      ) : (
                        <div className="flex justify-center items-center">
                            <p>Seleccione una materia o cree una nueva.</p>
                        </div>
                      )}
            </div>
        </div>
    );
}
