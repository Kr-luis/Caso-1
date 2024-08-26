import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Matriculas.css';

const CreateMatricula = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    const [idMaterias, setIdMaterias] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const crearMatricula = async (e) => {
        e.preventDefault();
        try {
            const nuevaMatricula = { codigo, descripcion, id_estudiante: idEstudiante, id_materias: idMaterias };
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/crear`, nuevaMatricula);
            setMensaje('Matrícula creada con éxito');
            limpiarFormulario();
        } catch (error) {
            setMensaje('Error al crear la matrícula');
        }
    };

    const limpiarFormulario = () => {
        setCodigo('');
        setDescripcion('');
        setIdEstudiante('');
        setIdMaterias([]);
    };

    const handleVerMatriculas = () => {
        navigate('/matriculas'); // Navega a la página de matrículas registradas
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
            <h2 className="titulo">Registrar Matrícula</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <form onSubmit={crearMatricula} className="formulario">
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
                    <button type="submit" className="boton">Registrar Matrícula</button>
                    <button type="button" onClick={handleVerMatriculas} className="boton-secundario">Ver Matrículas Registradas</button>
                </div>
            </form>
        </div>
    );
};

export default CreateMatricula;
