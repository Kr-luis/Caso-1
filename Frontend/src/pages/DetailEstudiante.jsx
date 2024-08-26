import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Estudiantes.css';

const DetailEstudiante = () => {
    const [estudiante, setEstudiante] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchEstudiante = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/ver/${id}`);
                setEstudiante(response.data);
            } catch (error) {
                console.error('Error al obtener el estudiante', error);
            }
        };

        fetchEstudiante();
    }, [id]);

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    if (!estudiante) return <p>Cargando...</p>;

    return (
        <div className="contenedor-estudiantes">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Detalles del Estudiante</h2>
            <div className="detalle">
                <p><strong>Nombre:</strong> {estudiante.nombre}</p>
                <p><strong>Apellido:</strong> {estudiante.apellido}</p>
                <p><strong>Cédula:</strong> {estudiante.cedula}</p>
                <p><strong>Fecha de Nacimiento:</strong> {new Date(estudiante.fecha_nacimiento).toLocaleDateString()}</p>
                <p><strong>Ciudad:</strong> {estudiante.ciudad}</p>
                <p><strong>Dirección:</strong> {estudiante.direccion}</p>
                <p><strong>Teléfono:</strong> {estudiante.telefono}</p>
                <p><strong>Email:</strong> {estudiante.email}</p>
            </div>
        </div>
    );
};

export default DetailEstudiante;
