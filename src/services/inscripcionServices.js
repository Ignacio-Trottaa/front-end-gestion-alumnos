import axios from 'axios';

const INSCRIPCION_BASE_REST_API_URL="http://localhost:8080/v1";

class inscripcionServices {
    inscribirse(idAlumno,idMateria){
        return axios.post(INSCRIPCION_BASE_REST_API_URL+"/alumno/"+idAlumno+"/inscripcion/"+idMateria);
    }
    desinscribirse(idAlumno,idMateria){
        return axios.delete(INSCRIPCION_BASE_REST_API_URL+"/alumno/"+idAlumno+"/desinscripcion/"+idMateria);
    }
}

export default new inscripcionServices();