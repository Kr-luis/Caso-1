import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/Materias.css';

const MateriasRegistradas = () => {
  const [materias, setMaterias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    obtenerMaterias();
  }, []);

  const obtenerMaterias = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/ver`);
      setMaterias(data);
    } catch (error) {
      setMensaje('Error al obtener las materias');
    }
  };

  const eliminarMateria = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/eliminar/${id}`);
      setMensaje('Materia eliminada con éxito');
      obtenerMaterias();
    } catch (error) {
      setMensaje('Error al eliminar la materia');
    }
  };

  const editarMateria = (materia) => {
    navigate(`/editar-materia/${materia._id}`, { state: { materia } }); // Navegar a la página de edición
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="contenedor-materias">
      <button className="btn-regresar" onClick={handleBack}>
        <FiArrowLeft className="icono-flecha" />
      </button>
      <h2 className="titulo">Materias Registradas</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <table className="tabla">
        <thead>
          <tr>
            <th className="tabla-encabezado">Nombre</th>
            <th className="tabla-encabezado">Código</th>
            <th className="tabla-encabezado">Descripción</th>
            <th className="tabla-encabezado">Créditos</th>
            <th className="tabla-encabezado">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia._id}>
              <td className="tabla-celda">{materia.nombre}</td>
              <td className="tabla-celda">{materia.codigo}</td>
              <td className="tabla-celda">{materia.descripcion}</td>
              <td className="tabla-celda">{materia.creditos}</td>
              <td className="tabla-celda">
                <button onClick={() => editarMateria(materia)} className="boton-editar">
                  Editar
                </button>
                <button onClick={() => eliminarMateria(materia._id)} className="boton-eliminar">
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

export default MateriasRegistradas;
