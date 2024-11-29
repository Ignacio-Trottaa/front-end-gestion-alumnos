import React from "react";
import { Link } from "react-router-dom";

const SidebarProfesor = ({ materias , onMateriaClick , onFormMateria}) => {
    return (
        <div className="w-64 h-full bg-[#0670B7] text-[#ecf0f1] p-3 fixed top-0 left-0 flex flex-col shadow-[2px_0_5px_rgba(0, 0, 0, 0.1)] overflow-y-auto">
            <div className="flex flex-col items-center mb-20 m-2">
                <h3 className="m-0 text-lg text-[#ecf0f1] text-center">Profesor</h3>
            </div>
            <nav className="grow">
                <ul className="p-0 list-none">
                    <li className="my-2.5" onClick={onFormMateria}>
                        <a className="text-base no-underline text-[#ecf0f1] flex items-center p-3 rounded hover:bg-[#06B78B] hover:cursor-pointer">
                            <i className="flex m-1 text-2xl"><ion-icon name="add-circle"></ion-icon></i>
                            Nueva materia
                        </a>
                    </li>

                    {materias.map((materia, index) => (
                        <li className="my-2.5" key={index} onClick={() => onMateriaClick(materia)}>
                            <a className="text-base no-underline text-[#ecf0f1] flex items-center p-3 rounded hover:bg-[#06B78B] hover:cursor-pointer">
                                <i className="flex m-1 text-2xl"><ion-icon name="book"></ion-icon></i>
                                {materia.nombre}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarProfesor;
