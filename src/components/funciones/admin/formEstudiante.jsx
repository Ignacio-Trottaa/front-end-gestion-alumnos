import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import EstudianteService from "../../../services/estudianteServices.js";
import { toast } from "react-toastify";

export default function FormEstudiante() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        lugarNacimiento: "",
        estadoCivil: "",
        cantidadHijos: "",
        familiaresACargo: "",
        direccion: "",
        numero: "",
        piso: "",
        departamento: "",
        localidad: "",
        codigoPostal: "",
        telefonoPersonal: "",
        correoElectronico: "",
        titulo: "",
        anioEgreso: "",
        institucion:"",
        localidadInstitucion: "",
        otrosEstudios: "",
        trabaja: null,
        actividad: "",
        horarioInicio: "",
        horarioFin: "",
        obraSocial: null,
        nombreObraSocial: "",
        estadoEstudiante: "true"
    });
    function vaciarFormulario(){
        setFormData({
            nombre: "",
            apellido: "",
            dni: "",
            fechaNacimiento: "",
            lugarNacimiento: "",
            estadoCivil: "",
            cantidadHijos: "",
            familiaresACargo: "",
            direccion: "",
            numero: "",
            piso: "",
            departamento: "",
            localidad: "",
            codigoPostal: "",
            telefonoPersonal: "",
            correoElectronico: "",
            titulo: "",
            anioEgreso: "",
            institucion:"",
            localidadInstitucion: "",
            otrosEstudios: "",
            trabaja: false,
            actividad: "",
            horarioInicio: "",
            horarioFin: "",
            obraSocial: false,
            nombreObraSocial: "",
            estadoEstudiante: "true"
        });
    }
    const [error, setError] = useState({
        nombre: false,
        apellido: false,
        dni: false,
        fechaNacimiento: false,
        lugarNacimiento: false,
        estadoCivil: false,
        cantidadHijos: false,
        familiaresACargo: false,
        direccion: false,
        numero: false,
        piso: false,
        departamento: false,
        localidad: false,
        codigoPostal: false,
        telefonoPersonal:false,
        correoElectronico: false,
        titulo: false,
        anioEgreso: false,
        institucion:false,
        localidadInstitucion: false,
        otrosEstudios: false,
        trabaja:false,
        actividad:false,
        horarioInicio: false,
        horarioFin: false,
        obraSocial: false,
        nombreObraSocial: false
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        const soloLetrasCampos = [
            "nombre",
            "apellido",
            "lugarNacimiento",
            "estadoCivil",
            "direccion",
            "localidad",
            "localidadInstitucion",
            "titulo",
            "otrosEstudios",
            "actividad",
            "nombreObraSocial"
        ];

        if (soloLetrasCampos.includes(name)) {
            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {//valida que solo sean letras
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        } else if (name === "horarioInicio" || name === "horarioFin" || name ==="institucion") {
            setFormData({
                ...formData,
                [name]: value
            })
        } else if (/^\d*$/.test(value)) {//valida que solo sean digitos//expresiones regulares
            setFormData({
                ...formData,
                [name]: value
            })
        } else if (name === "fechaNacimiento") {
            if (validarFecha(value)) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        } else if (name === "trabaja" || name === "obraSocial") {
            setFormData({
                ...formData,
                [name]: value === "true" ? true : false
            })
        } else if (name === "correoElectronico") {
                setFormData({
                    ...formData,
                    [name]: value.toLowerCase()
                })
        }
    }

    function validarFecha(fecha) {
        const fechaNacimiento = new Date(fecha);
        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mesNacimiento = fechaNacimiento.getMonth();
        const diaNacimiento = fechaNacimiento.getDate();

        if (hoy.getMonth() < mesNacimiento || (hoy.getMonth() === mesNacimiento && hoy.getDate() < diaNacimiento)) {
            edad--;
        }
        return edad >= 17;
    }

    const validarHorario = (e) => {
        const newErrors = {};
        const { name, value } = e.target;
        if (value.length === 5) {
            if (/^(0?[1-9]|1[0-2]) ?(am|pm)$/i.test(value)) {
                setFormData({
                    ...formData,
                    [name]: value
                });
                newErrors[name] = false;
            } else {
                newErrors[name] = true;
            }
        } else {
            // Actualiza el estado si el valor no está completo todavia.
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    function confirmarActualizacion(e){
        e.preventDefault()
        toast(
          ({ closeToast }) => (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-800 font-semibold">
                ¿Estás seguro de modificar los datos del estudiante?
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
        modificarEstudiante();
        toast.success("Estudiante actualizado correctamente", { autoClose: 2000 });
        closeToast();
      };

      function confirmarBaja(e){
        e.preventDefault()
        toast(
          ({ closeToast }) => (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-800 font-semibold">
                ¿Estás seguro de dar de baja al estudiante?
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
        bajaEstudiante();
        toast.success("Estudiante inhabilitado correctamente", { autoClose: 2000 });
        closeToast();
      };

      function confirmarReintegro(e){
        e.preventDefault()
        toast(
          ({ closeToast }) => (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-800 font-semibold">
                ¿Estás seguro reintegrar al estudiante?
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
        reintegrarEstudiante()
        toast.success("Estudiante habilitado correctamente", { autoClose: 2000 });
        closeToast();
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Validar cada campo
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            if (["departamento", "piso", "otrosEstudios"].includes(field)) {
                // Si el campo es depto, piso o otros_estudios y está vacío, no lo consideres error
                if (formData[field] !== "") {
                    newErrors[field] = false; // No hay error en los campos depto, piso o otros_estudios
                }
            } else if (formData[field] !=="") {
                newErrors[field] = false; // no encontró errores
            } else {
                newErrors[field] = true; // encontró errores
            }
        });

        // Actualizar el estado de errores
        setError(newErrors);
        console.log(newErrors);
        // Si no hay errores, puedes proceder con el envío del formulario
        if (Object.values(newErrors).every(val => !val)) {
            altaEstudiante(); // Llamamos a la función altaEstudiante aquí
        }else{
            console.log("Algunos campos requeridos no estan completos.");
        }
    };
    //HACER UNA CONSULTA PARA AGARRAR LOS DATOS DEL ALUMNO ATRAVES DEL ID 
    useEffect(() => {
        if (id) {
            EstudianteService.getEstudianteById(id).then((response) => {
                const data = response.data;
                console.log(data)
                const formDataById = {
                    ...data,
                    trabaja: data.trabaja === "true" ? true : data.trabaja === "false" ? false : data.trabaja,
                    obraSocial: data.obraSocial === "true" ? true : data.obraSocial === "false" ? false : data.obraSocial,
                    fechaNacimiento: data.fechaNacimiento ? `${data.fechaNacimiento[0]}-${String(data.fechaNacimiento[1]).padStart(2, '0')}-${String(data.fechaNacimiento[2]).padStart(2, '0')}`: ""
                };
                setFormData(formDataById);
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        } else {
            vaciarFormulario();
        }
    }, [id]);
    //llamada a la api
    const altaEstudiante = async () => {
        try {
            let response;
                response = await EstudianteService.AltaEstudiante(formData);
            if (response.status === 200 || response.status === 201) {
                console.log("Datos enviados exitosamente");
                console.log(response.data);
                toast.success("¡Alumno creado exitosamente!");
                vaciarFormulario();
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
    //llamadad a la api
    function modificarEstudiante(){
            EstudianteService.updateEstudiante(id, formData).then(response => {
                console.log(response.data);
                navigate("/admin/estudiantes");
            }).catch(error => {
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
    //llamadad a la api
    function bajaEstudiante(){
        EstudianteService.deleteEstudiante(id, formData).then(response => {
            console.log(response.data);
            navigate("/admin/estudiantes");
        }).catch(error => {
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
    //llamada a la api
    function reintegrarEstudiante() {
        EstudianteService.reintegrarAlumno(id).then(response => {
            console.log(response.data);
            navigate("/admin/estudiantes");
        }).catch(error => {
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
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="bg-white-100 p-10">
                <div className="w-full">
                <form action="" method="post" className="" onSubmit={handleSubmit}>
                    <h1 className="text-xl text-center">Formulario de estudiantes</h1>
                    <h2 className="text-lg">Datos del estudiante</h2>
                    <div className="flex">
                        <label className="m-2">Nombres</label>
                        {error.nombre && <p className="text-red-600 m-2">El nombre es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombres"
                        className="input"
                        onChange={handleInput}
                        value={formData.nombre}
                        maxLength={30}
                    />
                    <div className="flex">
                        <label className="m-2">Apellidos</label>
                        {error.apellido && <p className="text-red-600 m-2">El apellido es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        autoComplete="off"
                        placeholder="Apellidos"
                        className="input"
                        onChange={handleInput}
                        value={formData.apellido}
                        maxLength={30}
                    />
                    <div className="flex">
                        <label className="m-2">DNI</label>
                        {error.dni && <p className="text-red-600 m-2">El DNI es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="dni"
                        name="dni"
                        autoComplete="off"
                        placeholder="DNI"
                        className="input"
                        onChange={handleInput}
                        value={formData.dni}
                        minLength={8}
                        maxLength={8}
                    />
                    <div className="flex">
                        <label className="m-2">Fecha de Nacimiento</label>
                        {error.fechaNacimiento && <p className="text-red-600 m-2">La fecha de nacimiento es requerida</p>}
                    </div>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        className="input"
                        onChange={handleInput}
                        value={formData.fechaNacimiento}
                    />
                    <div className="flex">
                        <label className="m-2">Lugar de Nacimiento</label>
                        {error.lugarNacimiento && <p className="text-red-600 m-2">El lugar de nacimiento es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="lugarNacimiento"
                        name="lugarNacimiento"
                        autoComplete="off"
                        placeholder="Lugar de nacimiento"
                        className="input"
                        onChange={handleInput}
                        value={formData.lugarNacimiento}
                        maxLength={50}
                    />
                    <div className="flex">
                        <label className="m-2">Estado Civil</label>
                        {error.estadoCivil && <p className="text-red-600 m-2">El estado civil es requerido</p>}
                    </div>
                    <select
                        id="estadoCivil"
                        name="estadoCivil"
                        className="input"
                        onChange={handleInput}
                        value={formData.estadoCivil}>
                        <option value="">Seleccione...</option>
                        <option value="soltero">Soltero/a</option>
                        <option value="casado">Casado/a</option>
                        <option value="viudo">Viudo/a</option>
                        <option value="divorciado">Divorciado/a</option>
                    </select>
                    <div className="flex">
                        <label className="m-2">Hijos</label>
                        {error.cantidadHijos && <p className="text-red-600 m-2">La cantidad de hijos es requerida</p>}
                    </div>
                    <input
                        type="text"
                        id="cantidadHijos"
                        name="cantidadHijos"
                        autoComplete="off"
                        placeholder="Cantidad de hijos"
                        className="input"
                        onChange={handleInput}
                        value={formData.cantidadHijos}
                        maxLength={2}
                    />
                    <div className="flex">
                        <label className="m-2">Familiares a Cargo</label>
                        {error.familiaresACargo && <p className="text-red-600 m-2">La cantidad de familiares a cargo es requerida</p>}
                    </div>
                    <input
                        type="text"
                        id="familiaresACargo"
                        name="familiaresACargo"
                        autoComplete="off"
                        placeholder="Familiares a cargo"
                        className="input"
                        onChange={handleInput}
                        value={formData.familiaresACargo}
                        maxLength={2}
                    />
                    <div className="flex">
                        <label className="m-2">Dirección</label>
                        {error.direccion && <p className="text-red-600 m-2">La dirección es requerida</p>}
                    </div>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        autoComplete="off"
                        placeholder="Calle"
                        className="input"
                        onChange={handleInput}
                        value={formData.direccion}
                        maxLength={50}
                    />
                    <div className="flex">
                        <label className="m-2">Número</label>
                        {error.numero && <p className="text-red-600 m-2">El número es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        autoComplete="off"
                        placeholder="Número"
                        className="input"
                        onChange={handleInput}
                        value={formData.numero}
                        maxLength={4}
                    />
                    <label className="m-2">Piso</label>
                    <input
                        type="text"
                        id="piso"
                        name="piso"
                        autoComplete="off"
                        placeholder="Piso"
                        className="input"
                        onChange={handleInput}
                        value={formData.piso}
                        maxLength={2}
                    />
                    <label className="m-2">Departamento</label>
                    <input
                        type="text"
                        id="departamento"
                        name="departamento"
                        autoComplete="off"
                        placeholder="Depto"
                        className="input"
                        onChange={handleInput}
                        value={formData.departamento}
                        maxLength={50}
                    />
                    <div className="flex">
                        <label className="m-2">Localidad</label>
                        {error.localidad && <p className="text-red-600 m-2">La localidad es requerida</p>}
                    </div>
                    <input
                        type="text"
                        id="localidad"
                        name="localidad"
                        autoComplete="off"
                        placeholder="Localidad"
                        className="input"
                        onChange={handleInput}
                        value={formData.localidad}
                        maxLength={50}
                    />
                    <div className="flex">
                        <label className="m-2">Código Postal</label>
                        {error.codigoPostal && <p className="text-red-600 m-2">El Código Postal es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="codigoPostal"
                        name="codigoPostal"
                        autoComplete="off"
                        placeholder="Código postal"
                        className="input"
                        onChange={handleInput}
                        value={formData.codigoPostal}
                        minLength={4}
                        maxLength={4}
                    />
                    <div className="flex">
                        <label className="m-2">Teléfono Personal</label>
                        {error.telefonoPersonal && <p className="text-red-600 m-2">El teléfono personal es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="telefonoPersonal"
                        name="telefonoPersonal"
                        autoComplete="off"
                        placeholder="Teléfono personal"
                        className="input"
                        onChange={handleInput}
                        value={formData.telefonoPersonal}
                        maxLength={10}
                    />
                    <div className="flex">
                        <label className="m-2">Correo Electrónico</label>
                        {error.correoElectronico && <p className="text-red-600 m-2">El correo electrónico es requerido</p>}
                    </div>
                    <input
                        type="email"
                        id="correoElectronico"
                        name="correoElectronico"
                        autoComplete="off"
                        placeholder="Correo electrónico"
                        className="input"
                        onChange={handleInput}
                        value={formData.correoElectronico}
                        maxLength={40}
                    />

                    <h2 className="text-lg">Estudios Cursados</h2>
                    <div className="flex">
                        <label className="m-2">Titulo</label>
                        {error.titulo && <p className="text-red-600 m-2">El titulo es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        autoComplete="off"
                        placeholder="Titulo nivel medio o polimodal"
                        className="input"
                        onChange={handleInput}
                        value={formData.titulo}
                        maxLength={50}
                    />
                    <div className="flex">
                        <label className="m-2">Año de egreso</label>
                        {error.anioEgreso && <p className="text-red-600 m-2">El año de egreso es requerido</p>}
                    </div>
                    <input
                        type="text"
                        id="anioEgreso"
                        name="anioEgreso"
                        autoComplete="off"
                        placeholder="Año de egreso"
                        className="input"
                        onChange={handleInput}
                        value={formData.anioEgreso}
                        minLength={4}
                        maxLength={4}
                    />
                    <div className="flex">
                        <label className="m-2">Institución</label>
                        {error.institucion && <p className="text-red-600 m-2">La institución es requerida</p>}
                    </div>
                    <input
                        type="text"
                        id="institucion"
                        name="institucion"
                        autoComplete="off"
                        placeholder="Institución"
                        className="input"
                        onChange={handleInput}
                        value={formData.institucion}
                        maxLength={50}
                    />
                    <div className="flex">
                        <label className="m-2">Localidad Institución</label>
                        {error.localidadInstitucion && <p className="text-red-600 m-2">La localidad del instituto es requerida</p>}
                    </div>
                    <input
                        type="text"
                        id="localidadInstitucion"
                        name="localidadInstitucion"
                        autoComplete="off"
                        placeholder="Localidad del instituto"
                        className="input"
                        onChange={handleInput}
                        value={formData.localidadInstitucion}
                        maxLength={50} 
                    />
                    <label className="m-2">Otros estudios</label>
                    <input
                        type="text"
                        id="otrosEstudios"
                        name="otrosEstudios"
                        autoComplete="off"
                        placeholder="Otros estudios"
                        className="input"
                        onChange={handleInput}
                        value={formData.otrosEstudios}
                        maxLength={70}
                    />

                    <h2 className="text-lg">Datos laborales</h2>
                    <div className="flex">
                        <label className="m-2">¿Trabaja?</label>
                        {error.trabaja && <p className="text-red-600 m-2">El dato es requerido</p>}
                    </div>
                    <label className="m-2">Si</label>
                    <input
                        type="radio"
                        id="siTrabaja"
                        name="trabaja"
                        autoComplete="off"
                        className="mr-4"
                        value="true"
                        checked={formData.trabaja === true}
                        onChange={handleInput}
                    />
                    <label className="m-2">No</label>
                    <input
                        type="radio"
                        id="noTrabaja"
                        name="trabaja"
                        autoComplete="off"
                        className=""
                        value="false"
                        checked={formData.trabaja === false}
                        onChange={handleInput}
                    /><br />
                    <div className="" id="datosLaborales">
                        <div className="flex">
                            <label className="m-2">Actividad</label>
                            {error.actividad && <p className="text-red-600 m-2">La actividad es requerida</p>}
                        </div>
                        <input
                            type="text"
                            id="actividad"
                            name="actividad"
                            autoComplete="off"
                            placeholder="Actividad"
                            className="input"
                            onChange={handleInput}
                            value={formData.actividad}
                            maxLength={40}
                        />
                        <h2 className="text-lg">Horario Habitual</h2>
                        <div className="flex">
                            <label className="m-2">Inicio de Horario</label>
                            {error.horarioInicio && <p className="text-red-600 m-2">Horario invalido o no posee el formato solicitado</p>}
                        </div>
                        <input
                            type="text"
                            id="horarioInicio"
                            name="horarioInicio"
                            autoComplete="off"
                            placeholder="Ejm: 8 AM"
                            className="input"
                            onChange={validarHorario}
                            value={formData.horarioInicio}
                            maxLength={5}
                        />
                        <div className="flex">
                            <label className="m-2">Fin de Horario</label>
                            {error.horarioFin && <p className="text-red-600 m-2">Horario invalido o no posee el formato solicitado</p>}
                        </div>
                        <input
                            type="text"
                            id="horarioFin"
                            name="horarioFin"
                            autoComplete="off"
                            placeholder="Ejm: 5 PM"
                            className="input"
                            onChange={validarHorario}
                            value={formData.horarioFin}
                            maxLength={5}
                        />
                        <div className="flex">
                            <label className="m-2">¿Posee obra social?</label><br />
                            {error.obraSocial && <p className="text-red-600 m-2">El dato es requerido</p>}
                        </div>
                        <label className="m-2">Si</label>
                        <input
                            type="radio"
                            id="siObraSocial"
                            name="obraSocial"
                            autoComplete="off"
                            className="mr-4"
                            value="true"
                            checked={formData.obraSocial === true}
                            onChange={handleInput}
                        />
                        <label className="m-2">No</label>
                        <input
                            type="radio"
                            id="noObraSocial"
                            name="obraSocial"
                            autoComplete="off"
                            className=""
                            onChange={handleInput}
                            value="false"
                            checked={formData.obraSocial === false}
                        /><br />
                        <div className="" id="obraSocial">
                            <div className="flex">
                                <label className="m-2">Nombre de obra social</label>
                                {error.nombreObraSocial && <p className="text-red-600 m-2">El dato es requerido</p>}
                            </div>
                            <input
                                type="text"
                                id="nombreObraSocial"
                                name="nombreObraSocial"
                                autoComplete="off"
                                placeholder="Nombre de obra social"
                                className="input"
                                onChange={handleInput}
                                value={formData.nombreObraSocial}
                                maxLength={40}
                            />
                        </div>
                    </div>
                    <br />
                    {
                        (id) ? (
                            <div className="flex">
                                <input 
                                type="submit" 
                                value="Actualizar" 
                                onClick={(e) => confirmarActualizacion(e)} 
                                className="w-[50%] bg-blue-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-blue-500" />
                                {
                                    (formData.estadoEstudiante===true) ?(
                                        <input 
                                        type="submit" 
                                        value="Dar de baja" 
                                        className="w-[50%] bg-red-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-red-500" 
                                        onClick={(e)=>confirmarBaja(e)} 
                                        />
                                    ) : (
                                        <input 
                                        type="submit" 
                                        value="Reintegrar Estudiante" 
                                        className="w-[50%] bg-green-600 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-green-500" 
                                        onClick={(e) =>confirmarReintegro(e)}
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
                                <p>Registrar estudiante</p>
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