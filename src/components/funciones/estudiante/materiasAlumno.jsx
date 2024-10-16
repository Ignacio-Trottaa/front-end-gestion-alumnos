import React , { useEffect ,useState} from "react";
import ListaMaterias from "./listaMaterias";
import inscripcionServices from "../../../services/inscripcionServices";
import materiasProfeServices from "../../../services/materiasProfeServices";

export default function MateriasAlumno(){
    const [opcion,setOpcion] = useState("");
    const [find,setFind] = useState(false);
    const [idAlumno,setIdAlumno] = useState({
        id: 8 //sesion del alumno
    })
    const [dataMateria,setDataMateria] = useState({
        id: "",
        nombre:"",
        descripcion:"",
        curso:"",
        codigo:""
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setDataMateria({
            ...dataMateria,
            [name]: value
        });
    };
    const findMateria = (e) =>{
        e.preventDefault();
        materiasProfeServices.findMateria(dataMateria.id).then((response)=>{
            console.log(response.data);
            setDataMateria(response.data);
            setFind(true);
            inscripcionServices.inscribirse(idAlumno.id,dataMateria.id).then((response)=>{
                console.log(response.data);
            })            
        }).catch(error =>{
            setFind(false);
            console.log(error);
        })
    }
    const desinscribirse = (e) =>{
        e.preventDefault();
        inscripcionServices.desinscribirse(idAlumno.id,dataMateria.id).then((response)=>{
            console.log(response.data)
        })
    }

    return (
        <div className="p-4 flex flex-col items-center">
            <div className="justify-start flex">
                <button className="rounded-full  bg-blue-500 p-2 flex mr-2 cursor-pointer hover:bg-blue-400" onClick={() => setOpcion("unirse")}>
                    <i className="my-auto text-2xl"><ion-icon name="add"></ion-icon></i>
                    <label className="my-auto cursor-pointer">Unirse a materia</label>
                </button>
                <button className="rounded-full  bg-blue-500 p-2 flex cursor-pointer hover:bg-blue-400" onClick={() => setOpcion("verMaterias")}>
                    <i className="my-auto text-2xl"><ion-icon name="reorder"></ion-icon></i>
                    <label className="my-auto cursor-pointer">Ver materias</label>
                </button>
            </div>
            {
                opcion==="unirse" && (
                <div className="bg-blue-300 p-5 rounded-md shadow-xl m-3">
                    <form>
                        <h3 className="text-center text-xl mb-5">Unirse a un aula virtual</h3>
                        <label>Codigo de aula </label>
                        <input 
                        type="text" 
                        name="id"
                        id="id"
                        className="p-1 outline-none rounded-sm border-2 focus:border-blue-600"
                        value={dataMateria.id}
                        onChange={handleInput}
                       // maxLength={6}
                       // minLength={6} 
                        placeholder="Ingresa el codigo del aula"/><br/>
                        <button onClick={(e)=>findMateria(e)} className="mt-5 rounded-full w-full  bg-green-500 p-2 cursor-pointer hover:bg-green-400">Unirse</button>
                    </form>
                </div>
                )
            }
            {
                opcion==="verMaterias" && (
                    <div className="flex-col items-center w-3/4">
                        <ListaMaterias/>
                    </div>
                )
            }
            {
                    find && (
                        <div className="mt-5">
                            <p>Nombre: {dataMateria.nombre}</p>
                            <p>Descripcion: {dataMateria.descripcion}</p>
                            <p>Curso: {dataMateria.curso}</p>
                            <p>Codigo: {dataMateria.codigo}</p>
                            <button onClick={(e)=>desinscribirse(e)}>Desinscribirse</button>
                        </div>
                    )
            }
        </div>
        )
}