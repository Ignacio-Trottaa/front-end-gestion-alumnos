import React , { useEffect ,useState} from "react";
import ListaMaterias from "./listaMaterias";

export default function MateriasAlumno(){
    const [opcion,setOpcion] = useState("");

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
                    <form method="get">
                    <h3 className="text-center text-xl mb-5">Unirse a un aula virtual</h3>
                    <label>Codigo de aula </label>
                    <input 
                    type="text" 
                    name="codigoAula"
                    id="codigoAula"
                    className="p-1 outline-none rounded-sm border-2 focus:border-blue-600"
                    maxLength={6}
                    minLength={6} 
                    placeholder="Ingresa el codigo del aula"/><br/>
                    <button className="mt-5 rounded-full w-full  bg-green-500 p-2 cursor-pointer hover:bg-green-400">Unirse</button>
                    </form>
                </div>
                )
            }
            {
                opcion==="verMaterias" && (
                    <div>
                        <ListaMaterias/>
                    </div>
                )
            }
        </div>
        )
}