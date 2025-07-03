
import React, { useState, useEffect } from 'react';
import './EvaluacionForm.css';

function EvaluacionForm({ onSave, initialData }) {
    const [nombre, setNombre] = useState('');
    const [asignatura, setAsignatura] = useState('');
    const [promedio, setPromedio] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('evaluacionForm');
        if (saved && !initialData) {
            const data = JSON.parse(saved);
            setNombre(data.nombre || '');
            setAsignatura(data.asignatura || '');
            setPromedio(data.promedio || '');
        }
    }, [initialData]);

    useEffect(() => {
        const data = { nombre, asignatura, promedio };
        localStorage.setItem('evaluacionForm', JSON.stringify(data));
    }, [nombre, asignatura, promedio]);

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setAsignatura(initialData.asignatura);
            setPromedio(initialData.promedio);
        }
        setError('');
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !asignatura || !promedio) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (isNaN(promedio) || promedio < 1 || promedio > 7) {
            setError('El promedio debe estar entre 1 y 7');
            return;
        }
        onSave({ nombre, asignatura, promedio });
        setNombre('');
        setAsignatura('');
        setPromedio('');
        setError('');
        localStorage.removeItem('evaluacionForm');
    };

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <h2>Formulario de Evaluación</h2>
            {error && <div className="error">{error}</div>}
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label htmlFor="asignatura">Asignatura:</label>
            <input type="text" id="asignatura" value={asignatura} onChange={(e) => setAsignatura(e.target.value)} />

            <label htmlFor="promedio">Promedio:</label>
            <input type="number" id="promedio" value={promedio} onChange={(e) => setPromedio(e.target.value)} />

            <button type="submit">Guardar</button>
        </form>
    );
}

export default EvaluacionForm;
