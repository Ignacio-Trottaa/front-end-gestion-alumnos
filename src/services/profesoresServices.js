import axios from 'axios';

const PROFESOR_BASE_REST_API_URL = "http://localhost:8080/v1";

class ProfesorService {
    getAllProfesor() {
        return axios.get(PROFESOR_BASE_REST_API_URL + "/profesores");
    }
    saveProfesor(Profesor) {
        return axios.post(PROFESOR_BASE_REST_API_URL+"/profesor/alta",Profesor);
    }
    findProfesor(id) {
        return axios.get(PROFESOR_BASE_REST_API_URL + "/profesor/" + id);
    }
    updateProfesor(id ,Profesor) {
        return axios.put(PROFESOR_BASE_REST_API_URL+"/profesor/actualizar/"+id,Profesor);
    }
    deleteProfesor(id) {
        return axios.put(PROFESOR_BASE_REST_API_URL+"/profesor/eliminar/"+id);
    }
    reintegrarProfesor(id){
        return axios.put(PROFESOR_BASE_REST_API_URL+"/profesor/reintegrar/"+id)
    }
}
export default new ProfesorService();