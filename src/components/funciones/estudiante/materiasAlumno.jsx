import React , { useEffect ,useState} from "react";
import ListaMaterias from "./listaMaterias";
import inscripcionServices from "../../../services/inscripcionServices";
import Materia from "../../layout/materia";
import { toast } from "react-toastify";

export default function MateriasAlumno(){
    const [opcion,setOpcion] = useState("");
    const [idAlumno,setIdAlumno] = useState({
        id: 2 //sesion del alumno
    })
    const [codigo,setCodigo] = useState("")
    const [materiaSeleccionada,setMateriaSeleccionada] = useState(null);
    const handleInput = (e) => {
        setCodigo(e.target.value)
    };
    const inscribirse = (e) =>{
        e.preventDefault();
            inscripcionServices.inscribirse(idAlumno.id,codigo).then((response)=>{
                console.log(response.data);
                toast.success("¡Te uniste a una clase!");
                setCodigo("")
            }).catch(error=>{
                setCodigo("")
                console.log("Materia no encontrada.");
            })            
   }
    const handleMateriaSeleccionada = (materia) => {
        setMateriaSeleccionada(materia);
    };

    return (
        <div className="">
            {!materiaSeleccionada ? (
                <>
                    <div className="justify-center flex p-4 items-center">
                        <button
                            className="rounded-full bg-blue-500 p-2 flex mr-2 cursor-pointer hover:bg-blue-400"
                            onClick={() => setOpcion("unirse")}
                        >
                            <i className="my-auto text-2xl">
                                <ion-icon name="add"></ion-icon>
                            </i>
                            <label className="my-auto cursor-pointer">Unirse a materia</label>
                        </button>
                        <button
                            className="rounded-full bg-blue-500 p-2 flex cursor-pointer hover:bg-blue-400"
                            onClick={() => setOpcion("verMaterias")}
                        >
                            <i className="my-auto text-2xl">
                                <ion-icon name="reorder"></ion-icon>
                            </i>
                            <label className="my-auto cursor-pointer">Ver materias</label>
                        </button>
                    </div>

                    {opcion === "unirse" && (
                        <div className="bg-blue-300 p-5 rounded-md shadow-xl m-3 flex flex-col items-center">
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
                                    placeholder="Ingresa el codigo de la clase"
                                />
                                <br />
                                <button
                                    onClick={(e) => inscribirse(e)}
                                    className="mt-5 rounded-full w-full bg-green-500 p-2 cursor-pointer hover:bg-green-400"
                                >
                                    Unirse
                                </button>
                            </form>
                        </div>
                    )}

                    {opcion === "verMaterias" && (
                        <div className="">
                            <ListaMaterias
                                onMateriaSeleccionada={handleMateriaSeleccionada}
                            />
                        </div>
                    )}
                </>
            ) : (
                <Materia selectedMaterias={materiaSeleccionada} />
            )}
        </div>
    );
}