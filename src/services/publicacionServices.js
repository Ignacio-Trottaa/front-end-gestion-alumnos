import axios from "axios";

const PUBLICACION_BASE_REST_API_URL = "http://localhost:8080/v1";

class PublicacionService{
    getAllPublicacionesByMateriaId(materiaId) {
        return axios.get(PUBLICACION_BASE_REST_API_URL + "/publicaciones/"+materiaId);
    }

    createPublicacion(materiaId, publicacion,alumnoId,profesorId) {
        const data = new FormData();
            data.append("contenido", publicacion.contenido);
            data.append("fecha", publicacion.fecha);
            if (alumnoId) data.append("alumnoId", alumnoId);
            if (profesorId) data.append("profesorId", profesorId);
            if (publicacion.archivo) {
                if (publicacion.archivo instanceof File) {
                    data.append("archivo", publicacion.archivo);
                } else {
                    console.error("El archivo no es válido:", publicacion.archivo);
                }
            }
            console.log({
                contenido: publicacion.contenido,
                fecha: publicacion.fecha,
                alumnoId,
                profesorId,
                archivo: publicacion.archivo,
            });
    return axios.post(PUBLICACION_BASE_REST_API_URL+"/publicacion/"+materiaId, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });
    }
}

export default new PublicacionService();