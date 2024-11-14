import axios from 'axios'

const ESTUDIANTE_BASE_REST_API_URL = "http://localhost:8080/v1";

class EstudianteService {
    getAllEstudiantes() {
        return axios.get(ESTUDIANTE_BASE_REST_API_URL + "/alumnos");
    }
    AltaEstudiante(Alumno) {
        return axios.post(ESTUDIANTE_BASE_REST_API_URL + "/alumno/alta", Alumno);
    }
    getEstudianteById(id) {
        return axios.get(ESTUDIANTE_BASE_REST_API_URL + "/alumno/" + id);
    }
    updateEstudiante(id, Alumno) {
        return axios.put(ESTUDIANTE_BASE_REST_API_URL + "/alumno/actualizar/" + id, Alumno);
    }
    deleteEstudiante(id) {
        return axios.put(ESTUDIANTE_BASE_REST_API_URL + "/alumno/estado/" + id);
    }
    findAlumnoByDNI(dni) {
        return axios.get(ESTUDIANTE_BASE_REST_API_URL + "/alumno/dni/" + dni);
    }
    allMateriasByAlumno(id){
        return axios.get(ESTUDIANTE_BASE_REST_API_URL+"/alumno/"+id+"/materias");
    }
}

export default new EstudianteService();