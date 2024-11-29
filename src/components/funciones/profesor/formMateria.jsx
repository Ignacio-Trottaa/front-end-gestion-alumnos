import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import materiasProfeServices from "../../../services/materiasProfeServices";
import {toast} from 'react-toastify';

export default function FormMateria() {
    const navigate = useNavigate();
    const [userData,setUserData]=useState({
        id:4,
    })
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
                response = await materiasProfeServices.createMateria(formDataMateria,userData.id);

            if (response.status === 200 || response.status === 201) {
                console.log("Datos enviados exitosamente");
                console.log(response.data); // Maneja la respuesta si es necesario
                console.log(formDataMateria)
                setTimeout(() => {
                    toast.success("¡Materia creada exitosamente!")
                }, 2000);
                window.location.reload();
            } else {
                console.error("Error al enviar los datos");
            }
        } catch (error) {
            if (error.response) {
                navigate("/Error",{state : {
                       codigo: error.response.status,
                       error: error.response.data.error,
                       mensaje: error.message
                }});
            } else if (error.request) {
                const requestErrorMsg = "No se recibió respuesta del servidor";
                navigate("/Error", {state : {
                    codigo : 500,
                    error: "Error al intentar acceder al servidor",
                    mensaje: requestErrorMsg
                }});
            } else {
                navigate("/Error", {state : {
                    codigo: 0,
                    error: "Ocurrio un inconveniente",
                    mensaje: ""
                }})
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar los campos
        const newErrors = {};
        Object.keys(formDataMateria).forEach(field => {
                newErrors[field] = formDataMateria[field].trim() === "";
        });
        setError(newErrors);
        if (Object.values(newErrors).every(val => !val)) {
            createMateria();// Crea la clase
            setFormDataMateria({ nombre: "", descripcion: "", curso: "", codigo: generarCodigo()});  // Reinicia el formulario
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
