import React , {useState,useEffect} from "react";
export default function MateriaDetalle({ materia }) {
    return (
      <div>
        <h2>Materia: {materia.nombre}</h2>
        <p>Descripción: {materia.descripcion}</p>
        <p>Año: {materia.curso}</p>
        <textarea placeholder="Añadir comentario"></textarea>
        {/* Aquí puedes añadir funcionalidad para subir archivos */}
      </div>
    );
  }