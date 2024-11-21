import React,{useState,useEffect} from "react";
import PeticionesServices from "../../../services/peticionesServices";

export default function Peticiones() {

    const [peticiones,setPeticiones]= useState([]);
    const [descripcionVisible, setDescripcionVisible] = useState({});

    useEffect(()=>{
        PeticionesServices.recibirPeticiones().then((response)=>{
            setPeticiones(response.data);
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    const cumplirPeticion = (e,id) =>{
        e.preventDefault();
        PeticionesServices.cumplirPeticion(id).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }
    const toggleDescripcion = (id) => {
        setDescripcionVisible((prevDescripcionVisible) => {
          return { ...prevDescripcionVisible, [id]: !prevDescripcionVisible[id] };
        });
      }
    return (
        <div className="p-10"> 
            <div className="w-full">
                <h2 className="text-2xl">Peticiones</h2>
                {
                    peticiones.length>0 ? (
                        <div className="w-full m-2">
                    {
                        peticiones.map((peticion)=>(
                            <div key={peticion.id} className="bg-blue-300 m-2">
                                <div className="flex justify-between hover:cursor-pointer" onClick={()=>toggleDescripcion(peticion.id)}>
                                    <div className="p-4">
                                        <p>{peticion.estudiante} - {peticion.tipoSolicitud}</p>
                                    </div>
                                    <div className="bg-blue-400 hover:bg-blue-600" onClick={(e)=>{cumplirPeticion(e,peticion.id)}}>
                                        <button className="h-full p-4">
                                            <ion-icon name="close"></ion-icon>
                                    </button>
                                    </div>    
                                </div>
                                {
                                    descripcionVisible[peticion.id] && (
                                        <div className="p-4 bg-white">
                                            <p>Estudiante: {peticion.estudiante} <br />
                                                   DNI: {peticion.dni} <br />
                                                   Curso: {peticion.curso} <br />
                                                   Extiende a ciudad: {peticion.ciudad} <br />
                                                   A la fecha: {peticion.dia}-{peticion.mes}-{peticion.anio}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
                    ) : (
                        <div>
                            <p>No hay peticiones</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}