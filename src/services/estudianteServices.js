import axios from 'axios'

const ESTUDIANTE_BASE_REST_API_URL="";

class EstudianteService{
    getEstudiantes(){
        return axios.get(ESTUDIANTE_BASE_REST_API_URL);
    }
}

export default new EstudianteService();