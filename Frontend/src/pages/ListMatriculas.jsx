import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Matriculas.css';

const ListMatriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    const navigate = useNavigate(); // Definir el hook useNavigate

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
        navigate(-1); // Regresa a la página anterior
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
                                <Link to={`/matricula/detalle/${matricula._id}`} className="boton-detalle">Ver Detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMatriculas;
