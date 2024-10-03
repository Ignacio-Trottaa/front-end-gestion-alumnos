import axios from 'axios';

const MATERIA_PROFESOR_BASE_REST_API_URL= "http://localhost:8080/api";

class materiasProfesorService {
    createMateria(Materia) {
        return axios.post(MATERIA_PROFESOR_BASE_REST_API_URL+"/createMateria",Materia);
    }
}

export default new materiasProfesorService();