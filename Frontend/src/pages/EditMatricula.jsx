import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Matriculas.css';

const EditMatricula = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    const [idMaterias, setIdMaterias] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatricula = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/ver/${id}`);
                const matricula = response.data;
                setCodigo(matricula.codigo);
                setDescripcion(matricula.descripcion);
                setIdEstudiante(matricula.id_estudiante);
                setIdMaterias(matricula.id_materias);
            } catch (error) {
                console.error('Error al obtener la matrícula', error);
                Swal.fire('Error', 'No se pudo obtener la matrícula', 'error');
            }
        };

        fetchMatricula();
    }, [id]);

    const actualizarMatricula = async (e) => {
        e.preventDefault();
        if (!codigo || !descripcion || !idEstudiante || idMaterias.length === 0) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const matriculaActualizada = { codigo, descripcion, id_estudiante: idEstudiante, id_materias: idMaterias };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/actualizar/${id}`, matriculaActualizada);
            Swal.fire('Éxito', 'Matrícula actualizada con éxito', 'success');
            navigate(-1); // Regresa a la página anterior
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar la matrícula', 'error');
        }
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <div className="contenedor-matriculas">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Editar Matrícula</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <form onSubmit={actualizarMatricula} className="formulario">
                <div className="campo-group">
                    <label className="label">Código</label>
                    <input
                        type="text"
                        className="input"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Descripción</label>
                    <input
                        type="text"
                        className="input"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">ID Estudiante</label>
                    <input
                        type="text"
                        className="input"
                        value={idEstudiante}
                        onChange={(e) => setIdEstudiante(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">ID Materias (separados por comas)</label>
                    <input
                        type="text"
                        className="input"
                        value={idMaterias.join(', ')}
                        onChange={(e) => setIdMaterias(e.target.value.split(',').map(id => id.trim()))}
                    />
                </div>
                <div className="botones">
                    <button type="submit" className="boton">Actualizar Matrícula</button>
                </div>
            </form>
        </div>
    );
};

export default EditMatricula;
