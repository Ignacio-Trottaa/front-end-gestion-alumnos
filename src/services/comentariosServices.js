import axios from 'axios';

const COMENTARIOS_BASE_REST_API_URL = "http://localhost:8080/v1";

class ComentarioService{

    getAllComentariosByPublicacionId(publicacionId) {
        return axios.get(COMENTARIOS_BASE_REST_API_URL + "/comentarios/"+publicacionId);
    }

    createComentario(publicacionId,comentario,alumnoId,profesorId) {
        if(alumnoId!=null){
            return axios.post(COMENTARIOS_BASE_REST_API_URL + "/comentario/"+publicacionId+"?alumnoId="+alumnoId, comentario);
        }else if(profesorId!=null){
            return axios.post(COMENTARIOS_BASE_REST_API_URL +"/comentario/"+publicacionId+"?profesorId="+profesorId,comentario);
        }
    }

}

export default new ComentarioService();