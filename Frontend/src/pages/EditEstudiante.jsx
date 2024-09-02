import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';
import '../styles/Estudiantes.css';

const EditEstudiante = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstudiante = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/ver/${id}`);
                const estudiante = response.data;
                setNombre(estudiante.nombre);
                setApellido(estudiante.apellido);
                setCedula(estudiante.cedula);
                setFechaNacimiento(estudiante.fecha_nacimiento.slice(0, 10)); // Ajustar formato de fecha
                setCiudad(estudiante.ciudad);
                setDireccion(estudiante.direccion);
                setTelefono(estudiante.telefono);
                setEmail(estudiante.email);
            } catch (error) {
                console.error('Error al obtener el estudiante', error);
            }
        };

        fetchEstudiante();
    }, [id]);

    const actualizarEstudiante = async (e) => {
        e.preventDefault();
        try {
            const estudianteActualizado = { nombre, apellido, cedula, fecha_nacimiento: fechaNacimiento, ciudad, direccion, telefono, email };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso1/estudiante/actualizar/${id}`, estudianteActualizado);
            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'Estudiante actualizado con éxito',
            }).then(() => {
                navigate(-1); // Regresa a la página anterior
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el estudiante',
            });
        }
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <div className="contenedor-estudiantes">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Editar Estudiante</h2>
            <form onSubmit={actualizarEstudiante} className="formulario">
                <div className="campo-group">
                    <label className="label">Nombre</label>
                    <input
                        type="text"
                        className="input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Apellido</label>
                    <input
                        type="text"
                        className="input"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Cédula</label>
                    <input
                        type="text"
                        className="input"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="input"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Ciudad</label>
                    <input
                        type="text"
                        className="input"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Dirección</label>
                    <input
                        type="text"
                        className="input"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Teléfono</label>
                    <input
                        type="text"
                        className="input"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="botones">
                    <button type="submit" className="boton">Actualizar Estudiante</button>
                    <button type="button" onClick={handleBack} className="boton-secundario">Ver Estudiantes</button>
                </div>
            </form>
        </div>
    );
};

export default EditEstudiante;
