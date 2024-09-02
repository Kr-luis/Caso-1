import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Estudiantes.css';

const ListEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/ver`);
                setEstudiantes(response.data);
            } catch (error) {
                console.error('Error al obtener los estudiantes', error);
            }
        };

        fetchEstudiantes();
    }, []);

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar este registro después de eliminarlo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/eliminar/${id}`);
                Swal.fire(
                    'Eliminado!',
                    'El estudiante ha sido eliminado.',
                    'success'
                );
                // Actualizar la lista de estudiantes después de eliminar
                setEstudiantes(estudiantes.filter(estudiante => estudiante._id !== id));
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar el estudiante.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="contenedor-estudiantes">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Estudiantes Registrados</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cédula</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map(estudiante => (
                        <tr key={estudiante._id}>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.apellido}</td>
                            <td>{estudiante.cedula}</td>
                            <td>{estudiante.email}</td>
                            <td>
                                <Link to={`/estudiante/editar/${estudiante._id}`} className="boton-editar">Editar</Link>
                                <Link to={`detalle/${estudiante._id}`} className="boton-detalle">Ver Detalle</Link>
                                <button
                                    onClick={() => handleDelete(estudiante._id)}
                                    className="boton-eliminar"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEstudiantes;
