import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Materias.css';

const EditarMateria = () => {
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [creditos, setCreditos] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerMateria = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/ver/${id}`);
                setNombre(data.nombre);
                setCodigo(data.codigo);
                setDescripcion(data.descripcion);
                setCreditos(data.creditos);
            } catch (error) {
                Swal.fire('Error', 'No se pudo obtener la materia', 'error');
            }
        };

        obtenerMateria();
    }, [id]);

    const actualizarMateria = async (e) => {
        e.preventDefault();
        if (!nombre || !codigo || !descripcion || !creditos) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const materiaActualizada = { nombre, codigo, descripcion, creditos };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/actualizar/${id}`, materiaActualizada);
            Swal.fire('Éxito', 'Materia actualizada con éxito', 'success');
            navigate('/materias-registradas'); // Redirige a la página de materias registradas después de actualizar
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar la materia', 'error');
        }
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <div className="contenedor-materias">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
            </button>
            <h2 className="titulo">Editar Materia</h2>
            <form onSubmit={actualizarMateria} className="formulario">
                <div className="campo">
                    <label className="label">Nombre</label>
                    <input
                        type="text"
                        className="input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label className="label">Código</label>
                    <input
                        type="text"
                        className="input"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label className="label">Descripción</label>
                    <input
                        type="text"
                        className="input"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label className="label">Créditos</label>
                    <input
                        type="text"
                        className="input"
                        value={creditos}
                        onChange={(e) => setCreditos(e.target.value)}
                    />
                </div>
                <button type="submit" className="boton">Actualizar Materia</button>
            </form>
        </div>
    );
};

export default EditarMateria;
