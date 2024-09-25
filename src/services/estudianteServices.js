import axios from 'axios'

const ESTUDIANTE_BASE_REST_API_URL = "http://ec2-3-231-25-252.compute-1.amazonaws.com:80/api";

class EstudianteService {
    getAllEstudiantes() {
        return axios.get(ESTUDIANTE_BASE_REST_API_URL + "/alumnos");
    }
    AltaEstudiante(Alumno) {
        return axios.post(ESTUDIANTE_BASE_REST_API_URL + "/alumno/crear", Alumno);
    }
    getEstudianteById(id) {
        return axios.get(ESTUDIANTE_BASE_REST_API_URL + "/alumno/" + id);
    }
    updateEstudiante(id, Alumno) {
        return axios.put(ESTUDIANTE_BASE_REST_API_URL + "/alumno/update/" + id, Alumno);
    }
    deleteEstudiante(id, Alumno) {
        return axios.put(ESTUDIANTE_BASE_REST_API_URL + "/alumno/baja/" + id, Alumno);
    }
    findAlumnoByDNI(dni){
        return axios.get(ESTUDIANTE_BASE_REST_API_URL+"/alumno/dni/"+dni);
    }
}

export default new EstudianteService();