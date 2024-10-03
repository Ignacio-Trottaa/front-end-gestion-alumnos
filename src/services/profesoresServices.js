import axios from 'axios';

const PROFESOR_BASE_REST_API_URL = "http://localhost:8080/api";

class ProfesorService {
    getAllProfesor(){
        return axios.get(PROFESOR_BASE_REST_API_URL+"/profesores");
    }
    saveProfesor(Profesor){
        return axios.post(PROFESOR_BASE_REST_API_URL+"/profesor/crear",Profesor);
    }
    findProfesor(id){
        return axios.get(PROFESOR_BASE_REST_API_URL+"/profesor/"+id);
    }
    updateProfesor(id,Profesor){
        return axios.put(PROFESOR_BASE_REST_API_URL+"/profesor/update"+id,Profesor);
    }
    deleteProfesor(id){
        return axios.delete(PROFESOR_BASE_REST_API_URL+"/profesor/baja/",+id);
    }
}
export default new ProfesorService();