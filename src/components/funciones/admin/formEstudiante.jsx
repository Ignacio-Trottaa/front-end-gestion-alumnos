import { useParams } from "react-router-dom";
import React,{ useEffect ,useState } from "react";
import { handleTrabaja, handleObra } from "../js/formEstudiante";

export default function FormEstudiante() {

    let {id}=useParams();
    //HACER UNA CONSULTA PARA AGARRAR LOS DATOS DEL ALUMNO ATRAVES DEL ID 
/*
    const [estudiante , setEstudiante]=useState("");

    useEffect(() => {
        // Aquí puedes hacer una solicitud para obtener los datos del estudiante por su ID
        // y luego actualizar el estado con esos datos.
        // Por ejemplo, podrías hacer una solicitud HTTP para obtener los datos:
        // fetch(`/api/estudiantes/${id}`)
        //     .then(response => response.json())
        //     .then(data => setEstudiante(data));

        // De momento, se puede establecer un valor simulado:
        const numero=2;
        setEstudiante({
            iden: numero,
        });
    }, [id]);
*/
    return (
        <div className="bg-blue-100 p-10">
        <form action="" method="post" className="">
            <div className="w-full">
                <div className="p-4 pt-0 w-full">
                    <button className="bg-blue-400 w-8 rounded-tl-lg rounded-bl-lg p-1">
                        <ion-icon name="search"></ion-icon>
                    </button>
                    <input
                        type="text"
                        id="buscador"
                        name="buscador"
                        autoComplete="off"
                        className="w-[95%] pl-3 p-1 rounded-tr-lg rounded-br-lg focus:outline-none"
                        placeholder="Buscar DNI"
                        value={id}
                    />
                </div>

                <h1 className="text-xl text-center">Formulario de estudiates</h1>
                <h2 className="text-lg">Datos del estudiante</h2>

                <label className="m-2">Nombres</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    autoComplete="off"
                    placeholder="Nombres"
                    className="input"
                />
                <label className="m-2">Apellidos</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    autoComplete="off"
                    placeholder="Apellidos"
                    className="input"
                />
                <label className="m-2">DNI</label>
                <input
                    type="text"
                    id="dni"
                    name="dni"
                    autoComplete="off"
                    placeholder="DNI"
                    className="input"
                />
                <label className="m-2">Fecha de Nacimiento</label>
                <input
                    type="text"
                    id="fechaNac"
                    name="fechaNac"
                    autoComplete="off"
                    placeholder="YYYY/MM/DD"
                    className="input"
                />
                <label className="m-2">Lugar de Nacimiento</label>
                <input
                    type="text"
                    id="lugarNac"
                    name="lugarNac"
                    autoComplete="off"
                    placeholder="Lugar de nacimiento"
                    className="input"
                />
                <label className="m-2">Estado Civil</label>
                <input
                    type="text"
                    id="estadoCivil"
                    name="estadoCivil"
                    autoComplete="off"
                    placeholder="Estado civil"
                    className="input"
                />
                <label className="m-2">Hijos</label>
                <input
                    type="text"
                    id="hijos"
                    name="hijos"
                    autoComplete="off"
                    placeholder="Cantidad de hijos"
                    className="input"
                />
                <label className="m-2">Familiares a Cargo</label>
                <input
                    type="text"
                    id="familiaresACargo"
                    name="familiaresACargo"
                    autoComplete="off"
                    placeholder="Familiares a cargo"
                    className="input"
                />
                <label className="m-2">Dirección</label>
                <input
                    type="text"
                    id="calle"
                    name="calle"
                    autoComplete="off"
                    placeholder="Calle"
                    className="input"
                />
                <label className="m-2">Número</label>
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    autoComplete="off"
                    placeholder="Número"
                    className="input"
                />
                <label className="m-2">Piso</label>
                <input
                    type="text"
                    id="piso"
                    name="piso"
                    autoComplete="off"
                    placeholder="Piso"
                    className="input"
                />
                <label className="m-2">Departamento</label>
                <input
                    type="text"
                    id="depto"
                    name="depto"
                    autoComplete="off"
                    placeholder="Depto"
                    className="input"
                />
                <label className="m-2">Localidad</label>
                <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    autoComplete="off"
                    placeholder="Localidad"
                    className="input"
                />
                <label className="m-2">Partido</label>
                <input
                    type="text"
                    id="partido"
                    name="partido"
                    autoComplete="off"
                    placeholder="Partido"
                    className="input"
                />
                <label className="m-2">Código Postal</label>
                <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    autoComplete="off"
                    placeholder="Código postal"
                    className="input"
                />
                <label className="m-2">Telefono Personal</label>
                <input
                    type="text"
                    id="telefonoPersonal"
                    name="telefonoPersonal"
                    autoComplete="off"
                    placeholder="Teléfono personal"
                    className="input"
                />
                <label className="m-2">Correo Electrónico</label>
                <input
                    type="email"
                    id="correoElectronico"
                    name="correoElectronico"
                    autoComplete="off"
                    placeholder="Correo electrónico"
                    className="input"
                />

                <h2 className="text-lg">Estudios Cursados</h2>
                <label className="m-2">Titulo</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    autoComplete="off"
                    placeholder="Titulo nivel medio o polimodal"
                    className="input"
                />
                <label className="m-2">Año de egreso</label>
                <input
                    type="text"
                    id="año de egreso"
                    name="año de egreso"
                    autoComplete="off"
                    placeholder="Año de egreso"
                    className="input"
                />
                <label className="m-2">Institución</label>
                <input
                    type="text"
                    id="institucion"
                    name="institucion"
                    autoComplete="off"
                    placeholder="Institución"
                    className="input"
                />
                <label className="m-2">Distrito</label>
                <input
                    type="text"
                    id="distrito"
                    name="distrito"
                    autoComplete="off"
                    placeholder="Distrito"
                    className="input"
                />
                <label className="m-2">Otros estudios</label>
                <input 
                    type="text"
                    id="estudios"
                    name="estudios"
                    autoComplete="off"
                    placeholder="Otros estudios"
                    className="input"
                />

                <h2 className="text-lg">Datos laborales</h2>
                <label className="m-2">¿Trabaja?</label><br />
                <label className="m-2">Si</label>
                <input
                    type="radio"
                    id="siTrabaja"
                    name="trabaja"
                    autoComplete="off"
                    onClick={handleTrabaja}
                    className="mr-4"
                />
                <label className="m-2">No</label>
                <input 
                    type="radio"
                    id="noTrabaja"
                    name="trabaja"
                    autoComplete="off"
                    onClick={handleTrabaja}
                    className=""
                /><br />
                <div className="" id="datosLaborales">
                    <label className="m-2">Actividad</label>
                    <input
                        type="text"
                        id="actividad"
                        name="actividad"
                        autoComplete="off"
                        placeholder="Actividad"
                        className="input"
                    />
                    <label className="m-2">Horario</label>
                    <input
                        type="text"
                        id="horario"
                        name="horario"
                        autoComplete="off"
                        placeholder="Horario habitual"
                        className="input"
                    />
                    <label className="m-2">¿Posee obra social?</label><br />
                    <label className="m-2">Si</label>
                    <input
                        type="radio"
                        id="siObraSocial"
                        name="obraSocial"
                        autoComplete="off"
                        onClick={handleObra}
                        className="mr-4"
                    />
                    <label className="m-2">No</label>
                    <input 
                        type="radio"
                        id="noObraSocial"
                        name="obraSocial"
                        autoComplete="off"
                        onClick={handleObra}
                        className=""
                    /><br />
                    <div className="" id="obraSocial">
                        <label className="m-2">Nombre de obra social</label>
                        <input
                            type="text"
                            id="obraSocialNom"
                            name="obraSocialNom"
                            autoComplete="off"
                            placeholder="Nombre de obra social"
                            className="input"
                        />
                    </div>
                </div>
                <br />
                    <input type="submit" value="Eliminar" className="bg-red-500 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-red-600" />
                    <input type="submit" value="Registrar" className="bg-green-500 text-white p-2 rounded-md m-2 cursor-pointer hover:bg-green-600" />
                </div>
            </form>
        </div>
    );
}                   