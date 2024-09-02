import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Estudiantes.css';

const CreateEstudiante = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const crearEstudiante = async (e) => {
    e.preventDefault();

    // Validaciones en el frontend
    if ([nombre, apellido, cedula, fechaNacimiento, ciudad, direccion, telefono, email].includes('')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Lo sentimos, debes llenar todos los datos.',
      });
      return;
    }

    const Verificacion_numeros = /^[0-9]+$/;
    if (!Verificacion_numeros.test(cedula)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Asegúrate de ingresar solo números en la cédula.',
      });
      return;
    }

    if (!Verificacion_numeros.test(telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Asegúrate de ingresar solo números en el teléfono.',
      });
      return;
    }

    try {
      const nuevoEstudiante = { nombre, apellido, cedula, fecha_nacimiento: fechaNacimiento, ciudad, direccion, telefono, email };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/crear`, nuevoEstudiante);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Estudiante creado con éxito.',
      });
      limpiarFormulario();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el estudiante. Verifica los datos ingresados.',
      });
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setCedula('');
    setFechaNacimiento('');
    setCiudad('');
    setDireccion('');
    setTelefono('');
    setEmail('');
  };

  const handleVerEstudiantes = () => {
    navigate('/estudiantes'); // Navega a la página de estudiantes registrados
  };

  return (
    <div className="contenedor-estudiantes">
      <h2 className="titulo">Registrar Estudiante</h2>
      <form onSubmit={crearEstudiante} className="formulario">
        <div className="campo-group">
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
            <label className="label">Apellido</label>
            <input
              type="text"
              className="input"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
        </div>
        <div className="campo-group">
          <div className="campo">
            <label className="label">Cédula</label>
            <input
              type="text"
              className="input"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="input"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
        </div>
        <div className="campo-group">
          <div className="campo">
            <label className="label">Ciudad</label>
            <input
              type="text"
              className="input"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Dirección</label>
            <input
              type="text"
              className="input"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
        </div>
        <div className="campo-group">
          <div className="campo">
            <label className="label">Teléfono</label>
            <input
              type="text"
              className="input"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="botones">
          <button type="submit" className="boton">Registrar Estudiante</button>
          <button type="button" onClick={handleVerEstudiantes} className="boton-secundario">Ver Estudiantes Registrados</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEstudiante;
