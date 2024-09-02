import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/Matriculas.css';

const CreateMatricula = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreEstudiante, setNombreEstudiante] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    const [idMaterias, setIdMaterias] = useState([]);
    const [materiasDisponibles, setMateriasDisponibles] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerMateriasDisponibles();
        obtenerEstudiantes();
    }, []);

    const obtenerMateriasDisponibles = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/ver`);
            setMateriasDisponibles(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener las materias disponibles.',
            });
        }
    };

    const obtenerEstudiantes = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/ver`);
            setEstudiantes(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener los estudiantes.',
            });
        }
    };

    const seleccionarEstudiante = (estudiante) => {
        setNombreEstudiante(`${estudiante.nombre} ${estudiante.apellido}`);
        setIdEstudiante(estudiante._id);
        setCedula(estudiante.cedula);
    };

    const crearMatricula = async (e) => {
        e.preventDefault();

        if (!codigo || !descripcion || !idEstudiante || idMaterias.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, completa todos los campos y selecciona al menos una materia.',
            });
            return;
        }

        try {
            const nuevaMatricula = {
                codigo,
                descripcion,
                id_estudiante: idEstudiante,
                id_materias: idMaterias
            };
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/crear`, nuevaMatricula);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Matrícula creada con éxito.',
            });
            limpiarFormulario();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.msg : 'Error al crear la matrícula.',
            });
        }
    };

    const limpiarFormulario = () => {
        setCodigo('');
        setDescripcion('');
        setCedula('');
        setNombreEstudiante('');
        setIdEstudiante('');
        setIdMaterias([]);
    };

    const handleMateriaSeleccionada = (id) => {
        if (idMaterias.includes(id)) {
            setIdMaterias(idMaterias.filter(materiaId => materiaId !== id));
        } else {
            setIdMaterias([...idMaterias, id]);
        }
    };

    const handleVerMatriculas = () => {
        navigate('/matriculas');
    };

    return (
        <div className="contenedor-matriculas">
            <h2 className="titulo">Registrar Matrícula</h2>
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
                    <label className="label">Estudiante</label>
                    <input
                        type="text"
                        className="input"
                        value={nombreEstudiante}
                        readOnly
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Seleccionar Estudiante</label>
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="tabla-encabezado">Nombre</th>
                                <th className="tabla-encabezado">Apellido</th>
                                <th className="tabla-encabezado">Cédula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((estudiante) => (
                                <tr
                                    key={estudiante._id}
                                    onClick={() => seleccionarEstudiante(estudiante)}
                                    className={idEstudiante === estudiante._id ? 'fila-seleccionada' : ''}
                                >
                                    <td className="tabla-celda">{estudiante.nombre}</td>
                                    <td className="tabla-celda">{estudiante.apellido}</td>
                                    <td className="tabla-celda">{estudiante.cedula}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="campo-group">
                    <label className="label">Materias Disponibles</label>
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="tabla-encabezado">Seleccionar</th>
                                <th className="tabla-encabezado">Nombre</th>
                                <th className="tabla-encabezado">Código</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materiasDisponibles.map((materia) => (
                                <tr key={materia._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={idMaterias.includes(materia._id)}
                                            onChange={() => handleMateriaSeleccionada(materia._id)}
                                        />
                                    </td>
                                    <td className="tabla-celda">{materia.nombre}</td>
                                    <td className="tabla-celda">{materia.codigo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="campo-group">
                    <label className="label">Materias Seleccionadas</label>
                    <input
                        type="text"
                        className="input"
                        value={idMaterias.join(', ')}
                        readOnly
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
