import axios from "axios";

const PETICIONES_BASE_REST_API_URL="http://localhost:8080/v1";

class PeticionesServices{
    recibirPeticiones(){
        return axios.get(PETICIONES_BASE_REST_API_URL+"/peticiones");
    }
    enviarPeticiones(peticion){
        return axios.post(PETICIONES_BASE_REST_API_URL+"/peticion", peticion);
    }
    cumplirPeticion(id){
        return axios.delete(PETICIONES_BASE_REST_API_URL+"/peticion/"+id);
    }
}
export default new PeticionesServices;