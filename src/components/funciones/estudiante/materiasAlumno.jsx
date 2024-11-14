import React , { useEffect ,useState} from "react";
import ListaMaterias from "./listaMaterias";
import inscripcionServices from "../../../services/inscripcionServices";

export default function MateriasAlumno(){
    const [opcion,setOpcion] = useState("");
    const [idAlumno,setIdAlumno] = useState({
        id: 2 //sesion del alumno
    })
    const [codigo,setCodigo] = useState("")
    const handleInput = (e) => {
        setCodigo(e.target.value)
    };
    const inscribirse = (e) =>{
        e.preventDefault();
            inscripcionServices.inscribirse(idAlumno.id,codigo).then((response)=>{
                console.log(response.data);//agregar toast
                setCodigo("")
            }).catch(error=>{
                setCodigo("")
                console.log("Materia no encontrada.");
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
                        <h3 className="text-center text-xl mb-5">Unirse a una clase virtual</h3>
                        <label>Codigo de clase </label>
                        <input 
                        type="text" 
                        name="codigo"
                        id="codigo"
                        className="p-1 outline-none rounded-sm border-2 focus:border-blue-600"
                        value={codigo}
                        onChange={handleInput}
                        maxLength={6}
                        minLength={6} 
                        placeholder="Ingresa el codigo de la clase"/><br/>
                        <button onClick={(e)=>inscribirse(e)} className="mt-5 rounded-full w-full  bg-green-500 p-2 cursor-pointer hover:bg-green-400">Unirse</button>
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
        </div>
        )
}