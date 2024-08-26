import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Matriculas.css';

const DetailMatricula = () => {
    const [matricula, setMatricula] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchMatricula = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/ver/${id}`);
                setMatricula(response.data);
            } catch (error) {
                console.error('Error al obtener la matrícula', error);
            }
        };

        fetchMatricula();
    }, [id]);

    if (!matricula) return <p>Cargando...</p>;

    return (
        <div className="contenedor-matriculas">
            <button className="btn-regresar">
                <FiArrowLeft className="icono-flecha" />
            </button>
            <h2 className="titulo">Detalles de la Matrícula</h2>
            <div className="detalle">
                <p><strong>Código:</strong> {matricula.codigo}</p>
                <p><strong>Descripción:</strong> {matricula.descripcion}</p>
                <p><strong>Estudiante:</strong> {matricula.id_estudiante}</p>
                <p><strong>Materias:</strong> {matricula.id_materias.join(', ')}</p>
            </div>
        </div>
    );
};

export default DetailMatricula;
