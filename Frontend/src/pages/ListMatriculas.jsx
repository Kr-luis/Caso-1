import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Matriculas.css';

const ListMatriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatriculas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/ver`);
                setMatriculas(response.data);
            } catch (error) {
                console.error('Error al obtener las matrículas', error);
            }
        };

        fetchMatriculas();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEliminar = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/caso1/matriculas/eliminar/${id}`);
                Swal.fire(
                    'Eliminado',
                    'La matrícula ha sido eliminada.',
                    'success'
                );
                setMatriculas(matriculas.filter(matricula => matricula._id !== id));
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar la matrícula.',
            });
        }
    };

    return (
        <div className="contenedor-matriculas">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Matrículas Registradas</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Estudiante</th>
                        <th>Materias</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.map(matricula => (
                        <tr key={matricula._id}>
                            <td>{matricula.codigo}</td>
                            <td>{matricula.descripcion}</td>
                            <td>{matricula.id_estudiante}</td>
                            <td>{matricula.id_materias.join(', ')}</td>
                            <td>
                                <Link to={`/matricula/editar/${matricula._id}`} className="boton-editar">Editar</Link>
                                <Link to={`/matricula/detalle/${matricula._id}`} className="boton-detalle">Detalle</Link>
                                <button
                                    className="boton-eliminar"
                                    onClick={() => handleEliminar(matricula._id)}
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

export default ListMatriculas;
