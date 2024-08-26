import React, { useState } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/Materias.css';

const Materias = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creditos, setCreditos] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const crearMateria = async (e) => {
    e.preventDefault();
    try {
      const nuevaMateria = { nombre, codigo, descripcion, creditos };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/crear`, nuevaMateria);
      setMensaje('Materia creada con éxito');
      limpiarFormulario();
    } catch (error) {
      setMensaje('Error al crear la materia');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCodigo('');
    setDescripcion('');
    setCreditos('');
  };

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  const handleVerMaterias = () => {
    navigate('/materias-registradas'); // Navega a la página de materias registradas
  };

  return (
    <div className="contenedor-materias">
      <button className="btn-regresar" onClick={handleBack}>
        <FiArrowLeft className="icono-flecha" />
      </button>
      <h2 className="titulo">Registrar Materia</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <form onSubmit={crearMateria} className="formulario">
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
            type="number"
            className="input"
            value={creditos}
            onChange={(e) => setCreditos(e.target.value)}
          />
        </div>
        <div className="botones">
          <button type="submit" className="boton">Registrar Materia</button>
          <button type="button" onClick={handleVerMaterias} className="boton-secundario">Ver Materias Registradas</button>
        </div>
      </form>
    </div>
  );
};

export default Materias;
