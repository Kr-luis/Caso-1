import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Materias.css';

const EditarMateria = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creditos, setCreditos] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la materia desde la URL

  useEffect(() => {
    const obtenerMateria = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/ver/${id}`);
        setNombre(data.nombre);
        setCodigo(data.codigo);
        setDescripcion(data.descripcion);
        setCreditos(data.creditos);
      } catch (error) {
        setMensaje('Error al obtener la materia');
      }
    };

    obtenerMateria();
  }, [id]);

  const actualizarMateria = async (e) => {
    e.preventDefault();
    try {
      const materiaActualizada = { nombre, codigo, descripcion, creditos };
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/actualizar/${id}`, materiaActualizada);
      setMensaje('Materia actualizada con éxito');
      navigate('/materias-registradas'); // Redirige a la página de materias registradas después de actualizar
    } catch (error) {
      setMensaje('Error al actualizar la materia');
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
      {mensaje && <p className="mensaje">{mensaje}</p>}
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
            type="text" // Asegúrate de que este campo acepte texto
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
