import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import ProfesorService from "../../../services/profesoresServices";
import Alert from '@mui/material/Alert';

export default function FormProfesor(){
    const { id } = useParams();
    const [alta,setAlta] = useState(false);
    const navigate = useNavigate();
    const [formDataProfesor,setFormDataProfesor]=useState({
        nombre: "",
        apellido: "",
        dni:"",
        correoElectronico: "",
        telefono: "",
        materia: "",
        estadoProfesor:"true"
    });

    const [error,setError]=useState({
        nombre:false,
        apellido:false,
        dni:false,
        correoElectronico:false,
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
        }else if(name==="telefono" || name==="dni"){
            if(/^\d*$/.test(value)){
                setFormDataProfesor({
                    ...formDataProfesor,
                    [name]: value
                })
            }
        }else if(name==="correoElectronico"){
            setFormDataProfesor({
                ...formDataProfesor,
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
    function viewAlta(){
        const button = document.getElementById('buttonRegistro');
        setAlta(true);
        button.disabled=true;
        setTimeout(() => {
            setAlta(false);
            setFormDataProfesor({
                nombre:"",
                apellido:"",
                dni:"",
                correoElectronico: "",
                telefono: "",
                materia: "",
                estadoProfesor:"true"
            })
            button.disabled=false; 
        }, 3000);
        setTimeout(() => {
            navigate("/admin/formulario_profesores");
        }, 3000);
    }
    const altaProfesor = async () => {
        try {
            let response;
                response = await ProfesorService.saveProfesor(formDataProfesor);
            if (response.status === 200 || response.status === 201) {
                console.log("Datos enviados exitosamente");
                console.log(response.data); // Maneja la respuesta si es necesario
                viewAlta()
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

    useEffect(()=>{
        if(id){
            ProfesorService.findProfesor(id).then((response)=>{
                setFormDataProfesor(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }else{
            setFormDataProfesor({
                nombre: "",
                apellido: "",
                dni:"",
                correoElectronico: "",
                telefono: "",
                materia: "",
                estadoProfesor:"true"
            })
        }
    },[id]);
    
    const modificarProfesor = (e) => {
        e.preventDefault();
            ProfesorService.updateProfesor(id,formDataProfesor).then(response =>{
                console.log(response.data);
                navigate("/admin/profesores");
            }).catch(error=>{
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
            })
    }
    const bajaProfesor = (e) =>{
        e.preventDefault();
            ProfesorService.deleteProfesor(id,formDataProfesor).then(response =>{
                console.log(response.data);
                navigate("/admin/profesores");
            }).catch(error=>{
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
            })
    }

    return(
        <div className="bg-white-100 p-10">
            <div className="w-full">
                <form action="" method="post" onSubmit={handleSubmit}>
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
                        <label className="m-2">DNI</label>
                        { error.dni && <p className="text-red-600 m-2">* El DNI es requerido</p>}
                    </div>
                    <input 
                    type="text" 
                    id="dni"
                    name="dni"
                    autoComplete="off"
                    placeholder="DNI"
                    className="input"
                    minLength={8}
                    maxLength={8}
                    value={formDataProfesor.dni}
                    onChange={handleInput}
                    />
                    <div className="flex">
                        <label className="m-2">Correo electrónico</label>
                        { error.correoElectronico && <p className="text-red-600 m-2">* El correo es requerido</p>}
                    </div>
                    <input 
                    type="email" 
                    id="correoElectronico"
                    name="correoElectronico"
                    autoComplete="off"
                    placeholder="Correo electrónico"
                    className="input"
                    value={formDataProfesor.correoElectronico}
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
                    {
                        (id) ? (
                            <div className="flex">
                                <input 
                                type="submit" 
                                value="Actualizar" 
                                onClick={(e)=>modificarProfesor(e)} 
                                className="w-[50%] bg-blue-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-blue-500"/>
                                {
                                    (formDataProfesor.estadoProfesor===true) ? (
                                        <input 
                                        type="submit"
                                        value="Dar de baja"
                                        className="w-[50%] bg-red-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-red-500"
                                        onClick={(e)=>{
                                            if(window.confirm("¿Estás seguro de que deseas dar de baja a este profesor?")){
                                                bajaProfesor(e);
                                            }
                                        }}/>
                                    ) : (
                                        <input 
                                        type="submit"
                                        value="Reintegrar profesor"
                                        className="w-[50%] bg-green-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-green-500"
                                        onClick={(e)=>{
                                            if(window.confirm("¿Estás seguro de reintegrar a este profesor?")){
                                                console.log("reintegra");
                                            }
                                        }}/>
                                    )
                                }
                            </div>
                        ) : (
                            <div>
                                {
                                    alta===true && (
                                    <div>
                                       <Alert variant="filled" severity="success" className="w-full p-2 m-2 bg-green-400">
                                           Profesor Registrado
                                       </Alert>
                                   </div>
                                    )
                                }
                                <button
                                id="buttonRegistro"
                                className={`w-full text-white p-2 rounded-md m-2 cursor-pointer  ${ alta ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600 ' }"`}
                                >
                                    <div className="flex justify-center items-center">
                                        <p>Registrar Profesor</p>
                                    </div>
                                </button>
                            </div>
                        )
                    }
                </form>
            </div>
        </div>
    );
}