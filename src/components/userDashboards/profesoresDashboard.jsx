import { useState } from "react";
import React from "react";
import SidebarProfesor from "../layout/SidebarProfesor";
import FormMateria from "../funciones/profesor/formMateria";
import IAsideBar from "./iaSideBar.jsx";
import Materia from "../layout/materia.jsx";

export default function ProfesorDashboard() {
    const [viewIA,setViewIA] =useState(false);
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

    return (
        <div className="flex">
            <SidebarProfesor materias={materias} onMateriaClick={handleMateriaClick} onFormMateria={onFormMateria}/>
            <div className="ml-64 w-full">
                <div
                    className="sticky inset-0 bg-cover bg-center opacity-50"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "59%",
                        transform: "translate(-50%, -50%)",
                        height: "100%",
                        opacity: 0.6,
                        backgroundImage: "url('/LogoLeopoldoMarechal.png')",
                        filter: "blur(4px)"
                    }}
                />
                <div className="relative z-10">
                {
                    formMateria ? (
                        <FormMateria agregarMateria={ agregarMateria }/>
                    ) : selectedMaterias ? (
                        <Materia selectedMaterias={selectedMaterias} />
                    ) : (
                        <div className="flex justify-center items-center">
                            <p>Seleccione una materia o cree una nueva.</p>
                        </div>
                      )
                }
                </div>
            </div>
            <div className="fixed bottom-4 right-4">
                <button 
                className="p-2 bg-blue-500 text-white rounded-full w-[40px]" 
                onClick={() => setViewIA(!viewIA)}
                >IA</button>
            </div>
            {viewIA && <IAsideBar closeSidebar={() => setViewIA(false)}/>}
        </div>
    );
}
