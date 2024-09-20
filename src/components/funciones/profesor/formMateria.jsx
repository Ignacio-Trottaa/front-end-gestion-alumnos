import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function FormMateria() {
    const { agregarMateria } = useOutletContext();  // Obtén la función agregarMateria del contexto
    const [formDataMateria, setFormDataMateria] = useState({
        profesor_id: "1",
        nombre: "",
        descripcion: "",
        curso: ""
    });

    const [error, setError] = useState({
        nombre: false,
        descripcion: false,
        curso: false
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormDataMateria({
            ...formDataMateria,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar los campos
        const newErrors = {};
        Object.keys(formDataMateria).forEach(field => {
            newErrors[field] = formDataMateria[field].trim() === "";
        });

        setError(newErrors);

        if (Object.values(newErrors).every(val => !val)) {
            agregarMateria(formDataMateria);  // Llama a la función para agregar la materia
            setFormDataMateria({ profesor_id: "1", nombre: "", descripcion: "", curso: "" });  // Reinicia el formulario
        }
    };

    return (
        <div className="bg-white-100 p-10">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg">Formulario Materias</h2>
                <div className="flex">
                    <label>Nombre</label>
                    {error.nombre && <p className="text-red-600">* El nombre es requerido</p>}
                </div>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombre"
                        className="input"
                        value={formDataMateria.nombre}
                        onChange={handleInput}
                        maxLength={30}
                    />
                <div className="flex">
                    <label>Descripción</label>
                    {error.descripcion && <p className="text-red-600">* La descripción es requerida</p>}
                </div>
                    <input 
                        type="text" 
                        id="descripcion"
                        name="descripcion"
                        autoComplete="off"
                        placeholder="Descripcion"
                        className="input"
                        value={formDataMateria.descripcion}
                        onChange={handleInput}
                        maxLength={100}    
                    />
                <div className="flex">
                    <label>Año</label>
                    {error.curso && <p className="text-red-600">* El curso es requerido</p>}
                </div>
                <select 
                id="curso"     
                name="curso" 
                className="input"
                value={formDataMateria.curso}
                onChange={handleInput}
                >
                    <option value="">Seleccione...</option>
                    <option value="1">1° Año</option>
                    <option value="2">2° Año</option>
                    <option value="3">3° Año</option>
                </select>
                <input type="submit" value="Registrar" className="w-full bg-green-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-green-500" />
            </form>
            </div>
        </div>
        
    );
}
