

import React, { useState, useEffect } from 'react';
import EvaluacionForm from './components/EvaluacionForm';
import EvaluacionesList from './components/EvaluacionesList';
import './App.css';

function App() {

    const [evaluaciones, setEvaluaciones] = useState(() => {
        try {
            const storedEvaluaciones = localStorage.getItem('evaluaciones');
            return storedEvaluaciones ? JSON.parse(storedEvaluaciones) : [];
        } catch (error) {
            console.error("Error al cargar evaluaciones de localStorage:", error);
            return [];
        }
    });

    const [evaluacionToEdit, setEvaluacionToEdit] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
        } catch (error) {
            console.error("Error al guardar evaluaciones en localStorage:", error);
        }
    }, [evaluaciones]);

    const handleSaveEvaluacion = (nuevaEvaluacion) => {
        if (evaluacionToEdit) {
            setEvaluaciones(evaluaciones.map(evaluacionActual =>
                evaluacionActual.id === nuevaEvaluacion.id ? nuevaEvaluacion : evaluacionActual
            ));
            setEvaluacionToEdit(null);
        } else {
            setEvaluaciones([...evaluaciones, { ...nuevaEvaluacion, id: Date.now() }]);
        }
    };

    const handleEditEvaluacion = (id) => {
        const evaluacionEncontrada = evaluaciones.find(evaluacionEncontrada => evaluacionEncontrada.id === id);
        setEvaluacionToEdit(evaluacionEncontrada);
    };

    const handleDeleteEvaluacion = (id) => {
        setEvaluaciones(evaluaciones.filter(evaluacionAEliminar => evaluacionAEliminar.id !== id));
    };

    return (
        <div className="app-container">
            <h1>Evaluación de Alumnos</h1>

            {}
            <EvaluacionForm
                onSave={handleSaveEvaluacion}
                initialData={evaluacionToEdit}
                key={evaluacionToEdit ? evaluacionToEdit.id : 'new'}
            />

            <h2>Evaluaciones Guardadas</h2>
            <EvaluacionesList
                evaluaciones={evaluaciones}
                onEdit={handleEditEvaluacion}
                onDelete={handleDeleteEvaluacion}
            />
        </div>
    );
}

export default App;