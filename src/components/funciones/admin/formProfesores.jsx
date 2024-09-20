import React, { useEffect, useState } from "react";
import EstudianteService from "../../../services/estudianteServices.js";

export default function FormProfesor(){
    const [formDataProfesor,setFormDataProfesor]=useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        materia: ""
    });

    const [error,setError]=useState({
        nombre:false,
        apellido:false,
        email:false,
        telefono:false,
        materia:false
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        if(name==="nombre" || name==="apellido"){
            if (/^[a-zA-Z\s]*$/.test(value)) {//valida que solo sean letras
                setFormDataProfesor({
                    ...formDataProfesor,
                    [name]: value
                })   
            }
        }else if(name==="telefono"){
            if(/^\d*$/.test(value)){
                setFormDataProfesor({
                    ...formDataProfesor,
                    [name]: value
                })
            }
        }else if(name==="email"){
            setFormData({
                ...formData,
                [name]: value.toLowerCase()
            })
        }else if(name==="materia"){
            setFormDataProfesor({
                ...formDataProfesor,
                [name]: value
            })
        }
    }
    function validarCampo(campo) {
        return campo.trim() !== '';
    }
    const altaProfesor = async () => {
        /*
        try {
            let response;
                response = await EstudianteService.AltaEstudiante(formData);

            if (response.status === 200 || response.status === 201) {
                console.log("Datos enviados exitosamente");
                console.log(response.data); // Maneja la respuesta si es necesario
                console.log(formDataProfesor)
                // Redirige después de un envío exitoso
                navigate("/admin/formulario_profesores");
            } else {
                console.error("Error al enviar los datos");
            }
        } catch (error) {
            console.error("Error al enviar los datos a la API", error);
        }*/
       console.log(formDataProfesor)
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar cada campo
        const newErrors = {};
        Object.keys(formDataProfesor).forEach(field => {
                if (formDataProfesor[field] === "") {
                    newErrors[field] = false; // No hay error
                }
                if (!validarCampo(formDataProfesor[field])) {
                    newErrors[field] = true; // encontró errores
                } else {
                    newErrors[field] = false; // no encontró errores
                }
        });

        // Actualizar el estado de errores
        setError(newErrors);
        console.log(newErrors);
        // Si no hay errores, puedes proceder con el envío del formulario
        if (Object.values(newErrors).every(val => !val)) {
            altaProfesor(); // Llamamos a la función altaEstudiante aquí
        }
    };
    
    return(
        <div className="bg-white-100 p-10">
            <div className="w-full">
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <h1 className="text-xl text-center">Formulario de Profesores</h1>
                    <h2 className="text-lg">Datos del profesor</h2>
                    <div className="flex">
                        <label className="m-2">Nombre</label>
                        {error.nombre && <p className="text-red-600 m-2">* El nombre es requerido</p>}
                    </div>
                    <input 
                    type="text" 
                    id="nombre"
                    name="nombre"
                    autoComplete="off"
                    placeholder="Nombre"
                    className="input"
                    value={formDataProfesor.nombre}
                    onChange={handleInput}
                    maxLength={30}
                    />
                    <div className="flex">
                        <label className="m-2">Apellido</label>
                        { error.apellido && <p className="text-red-600 m-2">* El apellido es requerido</p>}
                    </div>
                    <input 
                    type="text" 
                    id="apellido"
                    name="apellido"
                    autoComplete="off"
                    placeholder="Apellido"
                    className="input"
                    value={formDataProfesor.apellido}
                    onChange={handleInput}
                    maxLength={30}
                    />
                    <div className="flex">
                        <label className="m-2">Email</label>
                        { error.email && <p className="text-red-600 m-2">* El email es requerido</p>}
                    </div>
                    <input 
                    type="email" 
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    className="input"
                    value={formDataProfesor.email}
                    onChange={handleInput}
                    maxLength={30}
                    />
                    <div className="flex">
                        <label className="m-2">Telefono</label>
                        { error.telefono && <p className="text-red-600 m-2">* El telefono es requerido</p>}
                    </div>
                    <input 
                    type="text" 
                    id="telefono"
                    name="telefono"
                    autoComplete="off"
                    placeholder="Telefono"
                    className="input"
                    value={formDataProfesor.telefono}
                    onChange={handleInput}
                    maxLength={10}
                    />
                    <div className="flex">
                        <label className="m-2">Materia</label>
                        { error.materia && <p className="text-red-600 m-2">* La materia es requerida</p>}
                    </div>
                    <input 
                    type="text" 
                    id="materia"
                    name="materia"
                    autoComplete="off"
                    placeholder="Materia"
                    className="input"
                    value={formDataProfesor.materia}
                    onChange={handleInput}
                    maxLength={40}
                    />

                    <input type="submit" value="Registrar" className="w-full bg-green-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-green-500" />
                </form>
            </div>
        </div>
    );
}