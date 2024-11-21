import axios from 'axios';

const MATERIA_PROFESOR_BASE_REST_API_URL= "http://localhost:8080/v1";

class materiasProfesorService {
    allMaterias(){
        return axios.get(MATERIA_PROFESOR_BASE_REST_API_URL+"/materias")
    }
    createMateria(Materia,profesorId) {
        return axios.post(MATERIA_PROFESOR_BASE_REST_API_URL+"/materia?profesorId="+profesorId,Materia);
    }
    updateMateria(id,Materia){
        return axios.put(MATERIA_PROFESOR_BASE_REST_API_URL+"/materia/"+id, Materia)
    }
    findMateria(id){
        return axios.get(MATERIA_PROFESOR_BASE_REST_API_URL+"/materia/"+id);
    }
    deleteMateria(id,Materia){
        return axios.delete(MATERIA_PROFESOR_BASE_REST_API_URL+"/materia/"+id, Materia);
    }
    getMateriasByProfesorId(id){
        return axios.get(MATERIA_PROFESOR_BASE_REST_API_URL+"/materias/profesor/"+id);
    }
}

export default new materiasProfesorService();