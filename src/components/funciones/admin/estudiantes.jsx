import { useState } from "react";
import React from "react";
import { estudiantes } from '../js/estudiantes.js';
import { Route } from "react-router-dom";

export default function Estudiantes() {
    return (
        <div className="p-5">
            <table className="w-full">
                <thead className="text-center text-white bg-blue-500">
                    <th className="p-2">N°</th>
                    <th className="p-2">Apellidos y Nombres</th>
                    <th className="p-2">DNI</th>
                    <th className="p-2">Curso</th>
                    <th className="p-2">Telefono</th>
                    <th className="p-2">Localidad</th>
                    <th className="p-2">Correo Electronico</th>
                    <th className="p-2">Estado</th>
                    <th className="p-2"></th>
                </thead>
                <tbody className="text-center">{
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
                            <td className="bg-slate-200"><a href={`/admin/formulario_estudiante/${estudiante.id}`}><i className="hover:text-blue-500"><ion-icon name="create"></ion-icon></i></a></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}