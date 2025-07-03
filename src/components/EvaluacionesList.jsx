
import React from 'react';
import EvaluacionItem from './EvaluacionItem';
import './EvaluacionesList.css';

function EvaluacionesList({ evaluaciones, onEdit, onDelete }) {
    return (
        <div className="list-container">
            {evaluaciones.length === 0 ? (
                <p>No hay evaluaciones guardadas aún. ¡Agrega una!</p>
            ) : (
                <div className="evaluacion-items-wrapper">
                    {evaluaciones.map(evaluacion => (
                        <EvaluacionItem
                            key={evaluacion.id}
                            evaluacion={evaluacion}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default EvaluacionesList;