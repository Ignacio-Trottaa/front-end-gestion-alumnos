import React, { useState } from "react";
import materiasProfeServices from "../../../services/materiasProfeServices";

export default function FormMateria({agregarMateria}) {
    function generarCodigo() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        let cantLength= 6;
        
        for (let i = 0; i < cantLength; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[randomIndex];
        }
        return codigo;
    }
    const [formDataMateria, setFormDataMateria] = useState({
        profesor_id: 1,
        nombre: "",
        descripcion: "",
        curso: "",
        codigo: generarCodigo(),
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

    const createMateria = async() =>{
        try {
            let response;
                response = await materiasProfeServices.createMateria(formDataMateria);

            if (response.status === 200 || response.status === 201) {
                console.log("Datos enviados exitosamente");
                console.log(response.data); // Maneja la respuesta si es necesario
                console.log(formDataMateria)
            } else {
                console.error("Error al enviar los datos");
            }
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error("Error en la respuesta de la API:", error.response.data);
            } else if (error.request) {
                // La petición fue hecha pero no hubo respuesta
                console.error("No se recibió respuesta del servidor", error.request);
            } else {
                // Algo pasó al configurar la petición que detonó un error
                console.error("Error al enviar los datos a la API", error.message);
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar los campos
        const newErrors = {};
        Object.keys(formDataMateria).forEach(field => {
            if(field==="profesor_id"){
                newErrors[field] = formDataMateria.profesor_id <= 0;
            }else{
                newErrors[field] = formDataMateria[field].trim() === "";
            }
        });
        setError(newErrors);
        if (Object.values(newErrors).every(val => !val)) {
            createMateria();
            agregarMateria(formDataMateria);  // Llama a la función para agregar la materia
            console.log(formDataMateria);
            setFormDataMateria({ profesor_id: "1", nombre: "", descripcion: "", curso: ""});  // Reinicia el formulario
        }
    };
    return (
        <div className="bg-white-100 p-10">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg">Formulario Materias</h2>
                <div className="flex">
                    <label>Nombre Materia</label>
                    {error.nombre && <p className="text-red-600">* El nombre de la materia es requerido</p>}
                </div>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombre de la materia"
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
