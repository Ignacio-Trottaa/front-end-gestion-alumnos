import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import ProfesorService from "../../../services/profesoresServices";
import { toast } from "react-toastify";


export default function FormProfesor(){
    const { id } = useParams();
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
    function vaciarFormulario(){
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
    function confirmarActualizacion(e){
        e.preventDefault()
        toast(
          ({ closeToast }) => (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-800 font-semibold">
                ¿Estás seguro de modificar los datos del profesor?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => confirmarModificacion(closeToast)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirmar
                </button>
                <button
                  onClick={closeToast}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ),
          {
            autoClose: false, // Evita que la alerta se cierre automáticamente
            closeOnClick: false,
          }
        );
      };
      const confirmarModificacion = (closeToast) => {
        modificarProfesor();
        toast.success("Profesor actualizado correctamente", { autoClose: 2000 });
        closeToast();
      };

      function confirmarBaja(e){
        e.preventDefault()
        toast(
          ({ closeToast }) => (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-800 font-semibold">
                ¿Estás seguro de dar de baja al profesor?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => bajaConfirmar(closeToast)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirmar
                </button>
                <button
                  onClick={closeToast}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ),
          {
            autoClose: false, // Evita que la alerta se cierre automáticamente
            closeOnClick: false,
          }
        );
      };
      const bajaConfirmar = (closeToast) => {
        bajaProfesor();
        toast.success("Profesor inhabilitado correctamente", { autoClose: 2000 });
        closeToast();
      };

      function confirmarReintegro(e){
        e.preventDefault()
        toast(
          ({ closeToast }) => (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-800 font-semibold">
                ¿Estás seguro reintegrar al profesor?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => reintegro(closeToast)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirmar
                </button>
                <button
                  onClick={closeToast}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ),
          {
            autoClose: false, // Evita que la alerta se cierre automáticamente
            closeOnClick: false,
          }
        );
      };
      const reintegro = (closeToast) => {
        reintegrarProfesor()
        toast.success("Profesor habilitado correctamente", { autoClose: 2000 });
        closeToast();
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
            vaciarFormulario();
        }
    },[id]);

    const altaProfesor = async () => {
        try {
            let response;
                response = await ProfesorService.saveProfesor(formDataProfesor);
            if (response.status === 200 || response.status === 201) {
                console.log("Datos enviados exitosamente");
                console.log(response.data); // Maneja la respuesta si es necesario
                toast.success("¡Profesor creado exitosamente!");
                vaciarFormulario()
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
    function modificarProfesor(){
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
    function bajaProfesor(){
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
    function reintegrarProfesor() {
        ProfesorService.reintegrarProfesor(id).then(response =>{
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
                                onClick={(e)=>confirmarActualizacion(e)} 
                                className="w-[50%] bg-blue-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-blue-500"/>
                                {
                                    (formDataProfesor.estadoProfesor===true) ? (
                                        <input 
                                        type="submit"
                                        value="Dar de baja"
                                        className="w-[50%] bg-red-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-red-500"
                                        onClick={(e)=>confirmarBaja(e)}
                                        />
                                    ) : (
                                        <input 
                                        type="submit"
                                        value="Reintegrar profesor"
                                        className="w-[50%] bg-green-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-green-500"
                                        onClick={(e)=>confirmarReintegro(e)}
                                        />
                                    )
                                }
                            </div>
                        ) : (
                            <div>
                                <button
                                id="buttonRegistro"
                                className={`w-full text-white p-2 rounded-md m-2 cursor-pointer bg-green-600 hover:bg-green-500`}
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