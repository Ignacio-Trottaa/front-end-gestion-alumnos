import React ,{ useState } from "react";
import PeticionesServices from '../../../services/peticionesServices.js';
import { toast } from "react-toastify";

export default function Solicitar() {

    const [seleccion,setSeleccion] = useState("");

    const handleSeleccion = (event) =>{
        setSeleccion(event.target.value);
        setFormData({
            ...formData,
            tipoSolicitud: event.target.value,
        })
    }

    const [formData,setFormData]= useState({
        tipoSolicitud:"",
        estudiante:"",
        dni: "",
        curso: "",
        ciudad:"",
        dia: "",
        mes: "",
        anio: "",
    });

    const handleInput = (e)=>{
        const {name, value} = e.target;

        if(name==="estudiante"){
            if(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/.test(value)){//valida que solo sean letras
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        }else if(/^\d*$/.test(value)){//valida que solo sean digitos//expresiones regulares
                setFormData({
                    ...formData,//copia todas las propiedades de formData existentes
                    [name]: value
            })
        }else if(name==="curso"){
                setFormData({
                    ...formData,
                    [name]: value
                })
        }else if(name==="ciudad"){
            if(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,]*$/.test(value)){//valida que solo sean letras
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        }
        
    }
    const enviarSolicitud = (e) =>{
        e.preventDefault();
        console.log(formData);
        PeticionesServices.enviarPeticiones(formData).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        setTimeout(() => {
            window.location.reload()    
        }, 2000);
        toast.success("¡Solicitud enviada a administracion!")
    }

    return (
        <div>
            <div className="m-5">
                <select name="" id="seleccion" onChange={handleSeleccion} className="w-full rounded border-2 border-blue-200 focus:outline-none">
                    <option value="seleccione" id="seleccioneOption">Seleccione...</option>
                    <option value="Constancia de alumno regular">Constancia de alumno regular</option>
                    <option value="otro">OTRO</option>
                </select>
            </div>
            {seleccion ==="Constancia de alumno regular" &&( 
                <div className="m-7" id="constancia">
                <form action="" method="get" onSubmit={enviarSolicitud}>
                    <p>Se deja constancia de que, a la fecha, 
                    <input type="text" name="estudiante" id="" value={formData.estudiante} onChange={handleInput} placeholder="Apellido y Nombre"
                    className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none"
                    autoComplete="off"
                    maxLength={30}
                    required
                    />
                     DNI<input type="text" name="dni" id="" value={formData.dni} onChange={handleInput} placeholder="DNI"
                     className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none"
                     autoComplete="off"
                     maxLength={8}
                     minLength={8}
                     required
                     />
                    es alumno/a regular del INSTITUTO SUPERIOR DE FORMACIÓN TÉCNICA MUNICIPAL "LEOPOLDO MARECHAL" DIEGEP-8166 de la especialidad  
                    <b> TÉCNICATURA SUPERIOR EN DESARROLLO DE SOFTWARE </b> 
                    curso
                    <select name="curso" 
                        id="curso" 
                        className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none" 
                        onChange={handleInput}    
                        required
                    >
                        <option value="" id="curso">Seleccione curso</option>
                        <option value="1°AÑO">1°AÑO</option>
                        <option value="2°AÑO">2°AÑO</option>
                        <option value="3°AÑO">3°AÑO</option>
                    </select>
                    A pedido del interesado/a y para ser presentada ante quien corresponda, se extiende en la ciudad de 
                    <input type="text" name="ciudad" id="" value={formData.ciudad} onChange={handleInput} placeholder="Ciudad"
                    className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none"
                    autoComplete="off"
                    maxLength={30}
                    required
                    />a los 
                    <input type="text" name="dia" id="" value={formData.dia} onChange={handleInput} placeholder="Dia"
                    className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none"
                    autoComplete="off"
                    maxLength={2}
                    minLength={1}
                    required
                    />días del mes
                    <input type="text" name="mes" id="" value={formData.mes} onChange={handleInput} placeholder="Mes"
                    className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none"
                    autoComplete="off"
                    maxLength={2}
                    minLength={1}
                    required
                    />de 
                    <input type="text" name="anio" id="" value={formData.anio} onChange={handleInput} placeholder="Año"
                    className="rounded border-2 border-blue-200 mx-1 focus:border-blue-600 focus:outline-none"
                    autoComplete="off"
                    maxLength={4}
                    minLength={4}
                    required
                    />año.
                    </p>
                    <input type="submit" value="Solicitar" className="rounded bg-blue-300 m-5 ml-0 p-1 w-40 hover:cursor-pointer hover:bg-blue-400" />
                </form>
                </div>
            )}
        </div>
    );
}