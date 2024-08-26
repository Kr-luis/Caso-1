import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Matriculas.css';

const DetailMatricula = () => {
    const [matricula, setMatricula] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Definir useNavigate para manejar la navegación

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
            <button className="btn-regresar" onClick={() => navigate(-1)}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
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
