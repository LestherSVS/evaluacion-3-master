
import React from 'react';
import './EvaluacionItem.css';

function EvaluacionItem({ evaluacion, onEdit, onDelete }) {
    return (
        <div className="evaluacion-item">
            <p><strong>Alumno:</strong> {evaluacion.nombre}</p>
            <p><strong>Asignatura:</strong> {evaluacion.asignatura}</p>
            <p><strong>Promedio:</strong> {evaluacion.promedio}</p>
            {evaluacion.destacado && <span className="tag destacado">Destacado</span>}
            <div className="item-actions">
                <button className="btn-edit" onClick={() => onEdit(evaluacion.id)}>Editar</button>
                <button className="btn-delete" onClick={() => onDelete(evaluacion.id)}>Eliminar</button>
            </div>
        </div>
    );
}

export default EvaluacionItem;