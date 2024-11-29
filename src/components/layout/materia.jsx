import React, {useState,useEffect} from "react";
import PublicacionService from "../../services/publicacionServices.js";
import ComentariosServices from "../../services/comentariosServices.js";

const Materia = ({selectedMaterias}) =>{//componente
    useEffect(() => {
        const interval = setInterval(()=>{
            cargarPublicaciones()
        },5000);
        return ()=>clearInterval(interval);
      }, [selectedMaterias]);

const url = window.location.href;
const isProfesor = url.includes("/profesor");
const [userData, setUserData] = useState({
    //Deberia de estar los datos del usuario
    id: isProfesor ? 4 : 2,
    rol: isProfesor ? "profesor" : "estudiante"
});
const [publicaciones, setPublicaciones] = useState([]);
const [formDataPublicacion, setFormDataPublicacion] = useState({
    contenido: "",
    archivo: null,
    fecha: ""
});
const [archivo, setArchivo] = useState(null);


function cargarPublicaciones() {
    PublicacionService.getAllPublicacionesByMateriaId(selectedMaterias.id)
        .then((response) => {
            setPublicaciones(response.data);
            console.log(response.data);
    }).catch(error=>{
        console.log(error);
    })
}

function obtenerFecha(date) {
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");
    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }
function publicarNovedad(e){
    e.preventDefault()
    const fechaActual = obtenerFecha(new Date());
    const publicacionData = {
        ...formDataPublicacion,
        fecha: fechaActual,
        archivo,
    }
    console.log(publicacionData);
    if(userData.rol==="estudiante"){
        PublicacionService.createPublicacion(
            selectedMaterias.id,
            publicacionData,
            userData.id,
            null
        ).then((response)=>{
            console.log(response);
            setFormDataPublicacion({
                contenido:"",
                fecha:"",
            });
            setArchivo(null);
            cargarPublicaciones();
        }).catch((error)=>{
            console.log("Error al crear la publicación:",error);
        })
    }else if(userData.rol==="profesor"){
        PublicacionService.createPublicacion(
            selectedMaterias.id,
            publicacionData,
            null,
            userData.id
        ).then((response)=>{
            console.log(response);
            setFormDataPublicacion({
                contenido:"",
                fecha:"",
            })
            setArchivo(null);
            cargarPublicaciones();
        }).catch((error)=>{
            console.log("Error al crear la publicación:",error);
        })
    }
}

const [comentarios, setComentarios] = useState({}); // Estado para los comentarios por publicación
const [showComments, setShowComments] = useState(false);

const handleComentarioChange = (id, value) => {
setComentarios((prev) => ({
    ...prev,
    [id]: value, // Actualiza solo el comentario del ID correspondiente
}));
};

const handleEnviarComentario = (id) => {
const comentario = comentarios[id];
if (comentario) {
    const fechaActual = obtenerFecha(new Date());
    const dataComentario = {
        contenido: comentario,
        fecha: fechaActual
    }
    if(userData.rol==="estudiante"){
        ComentariosServices.createComentario(id,dataComentario,userData.id,null)
        .then((response)=>{
            console.log(response);
            setComentarios((prev)=>({
                ...prev,
                [id]:"",
            }));
        }).catch((error)=>{
            console.log("Error al crear el comentario:",error);
        })
    }else if(userData.rol==="profesor"){
        ComentariosServices.createComentario(id,dataComentario,null,userData.id)
        .then((response)=>{
            console.log(response);
            setComentarios((prev)=>({
                ...prev,
                [id]:"",
            }));
        }).catch((error)=>{
            console.log("Error al crear el comentario:",error)
        })
    }
}
};

    return(
        <div className="p-5 bg-white border h-full">
                        <div className="m-5 bg-blue-300 w-75% h-40 rounded-md">
                            <div className="p-5">
                            <h3 className="text-lg font-bold">Materia: {selectedMaterias.nombre}</h3>
                            <p>Descripción: {selectedMaterias.descripcion}</p>
                            <p>Año: {selectedMaterias.curso}° Año</p>
                                {userData.rol === "profesor" && (
                                    <p>Código de clase: {selectedMaterias.codigo}</p>
                                )}
                            </div>
                        </div>
                        {/*Publicar cosas*/}
                        <div className="mt-4 rounded-md shadow-lg ">
                            <form method="post" onSubmit={(e)=>publicarNovedad(e)} className="flex flex-col">
                                <textarea 
                                    name="comment" 
                                    id="comment"
                                    className="w-full p-2 border-x border-t rounded-t outline-none" 
                                    placeholder="Comenta algo a la clase"
                                    value={formDataPublicacion.contenido}
                                    onChange={(e)=>{
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                        setFormDataPublicacion({...formDataPublicacion,contenido:e.target.value})
                                    }}
                                    style={{
                                        width: "100%",
                                        resize: "none",
                                        overflow: "hidden"
                                    }}
                                    >
                                </textarea>
                                <input 
                                    type="file" 
                                    name="file" 
                                    id="file" 
                                    className="w-full text-lg border"
                                    onChange={(e) => setArchivo(e.target.files[0])}
                                    />
                                
                                {/*deshabilitar boton si no hay imagen y ni mensaje */}
                                <input 
                                    type="submit" 
                                    value="Publicar" 
                                    className={`w-full p-2 ${formDataPublicacion.contenido.trim() ? "bg-blue-500 text-white rounded-b hover:bg-[#06B78B] cursor-pointer" : "bg-gray-400 text-gray-600 rounded-b cursor-not-allowed"}`}
                                    disabled={!formDataPublicacion.contenido.trim()}
                                />
                            </form>
                        </div>
                        {/*Cargar publicaciones mediante la api*/}
                        <div className="mt-4">
                            {publicaciones.map((publicacion) => (
                                <div key={publicacion.id} className="rounded-md shadow-lg border-2 mb-4">
                                    <div className="p-5">
                                        <p className="text-lg">{publicacion.creadorNom} {publicacion.creadorApe}</p>
                                        <p className="text-[0.75rem] text-gray-500">{publicacion.fecha}</p>
                                        <p>
                                            {publicacion.contenido.split("\r").map((linea, index) => (
                                                <React.Fragment key={index}>
                                                    {linea}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>
                                    {publicacion.archivo && (
                                    <div className="border-t-2 px-5 py-2">
                                        <p>Archivo adjunto</p>
                                        <a
                                        href={`http://localhost:8080/v1/archivo/${publicacion.archivo.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {publicacion.archivo.nombre}
                                    </a>
                                    </div>
                                    )}
                                    {/*Seccion comentarios*/}
                                    <div className="flex justify-between border-t-2 pt-4">
                                        <div className="w-[10%] flex justify-end items-center h-10">
                                            <i className="text-2xl"><ion-icon name="person"></ion-icon></i>
                                        </div>
                                        <div className="w-[80%] ml-2">
                                            <textarea 
                                                name="comentario" 
                                                id={`comentario-${publicacion.id}`}
                                                className="w-full h-11 p-2 pl-4 border rounded-3xl outline-none " 
                                                placeholder="Añade un comentario a la publicacion"
                                                value={comentarios[publicacion.id] || ""}
                                                onChange={(e)=>{
                                                    if(e.target.value === ""){
                                                        e.target.style.height = "44px";
                                                    }else{
                                                        e.target.style.height = "auto";
                                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                                    }
                                                    handleComentarioChange(publicacion.id, e.target.value)
                                                }}
                                                style={{
                                                    width: "100%",
                                                    resize: "none",
                                                    overflow: "hidden"
                                                }}
                                            />
                                        </div>
                                        <div className="w-[10%]">
                                            <button
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white ml-2"
                                            onClick={() => handleEnviarComentario(publicacion.id)}
                                            >
                                                <i className="pt-1 ml-1"><ion-icon name="send"></ion-icon></i>
                                            </button>
                                        </div>
                                    </div>
                                     {/* Comentarios */}
                                    <div className="mt-2 p-4 bg-gray-100">
                                        <div className="flex items-center content-center">
                                            <i className="text-2xl cursor-pointer" onClick={()=>setShowComments(!showComments)}><ion-icon name="people"></ion-icon></i>
                                            <h4 
                                                className="text-sm font-bold mb-1 ml-1 hover: cursor-pointer" 
                                                onClick={()=>setShowComments(!showComments)}
                                            >
                                                {`${publicacion.comentarios.length} Comentarios:`}
                                            </h4>
                                        </div>
                                        {
                                            showComments&&(
                                                <div>
                                                    {publicacion.comentarios && publicacion.comentarios.length > 0 ? (
                                                        publicacion.comentarios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map((comentario) => (
                                                            <div key={comentario.id} className="mb-2">
                                                                <p className="text-lg">{comentario.creadorNom} {comentario.creadorApe}</p>
                                                                <p className="text-[0.75rem] text-gray-500">{comentario.fecha}</p>
                                                                <p>
                                                                    {comentario.contenido.split("\r").map((linea, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {linea}
                                                                            <br />
                                                                        </React.Fragment>
                                                                    ))}
                                                                </p>
                                                            </div>
                                                        ))
                                                        ) : (
                                                        <p className="text-[0.875rem] text-gray-500">No hay comentarios.</p>
                                                        )}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

        </div>
    )
}
export default Materia;