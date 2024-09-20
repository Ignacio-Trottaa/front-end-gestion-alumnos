import { useState } from "react";
import React from "react";
import SidebarProfesor from "../layout/SidebarProfesor";
import { Outlet } from "react-router-dom";

export default function ProfesorDashboard() {
    // Estado para las materias
    const [materias, setMaterias] = useState([]);

    // Función para agregar una nueva materia
    const agregarMateria = (nuevaMateria) => {
        setMaterias([...materias, nuevaMateria]);
    };

    return (
        <div className="flex">
            {/* Pasamos las materias y la función agregarMateria como props */}
            <SidebarProfesor materias={materias} />
            <div className="ml-64 w-full">
                <Outlet context={{ agregarMateria }} />
            </div>
        </div>
    );
}
