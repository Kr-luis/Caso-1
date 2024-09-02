import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../styles/Registrar.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Registrar = () => {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(form).includes("")) {
            Swal.fire({
                title: 'Error',
                text: 'Lo sentimos, debes llenar todos los campos',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            });
            return;
        }

        if (form.password !== form.confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            });
            return;
        }

        if (form.password.length < 8) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/caso1/usuario/registro`;
            const respuesta = await axios.post(url, {
                nombre: form.nombre,
                apellido: form.apellido,
                email: form.email,
                password: form.password,
            });

            Swal.fire({
                title: 'Éxito',
                text: respuesta.data.msg,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            }).then(() => {
                setForm({
                    nombre: "",
                    apellido: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.msg || 'Error desconocido',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            });
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <div className="welcome-section">
                        <h1>Registro al Sistema</h1>
                    </div>
                    <div className="form-section">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    placeholder="Ingresa tu Nombre" 
                                    name="nombre"
                                    value={form.nombre} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Apellido</label>
                                <input 
                                    type="text" 
                                    placeholder="Ingresa tu Apellido" 
                                    name="apellido"
                                    value={form.apellido} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    placeholder="Ingresa tu Correo Electrónico" 
                                    name="email"
                                    value={form.email} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group password-group">
                                <label>Contraseña</label>
                                <div className="password-input">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="* * * * * * * *" 
                                        name="password"
                                        value={form.password} 
                                        onChange={handleChange}
                                    />
                                    <span onClick={toggleShowPassword}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <div className="input-group password-group">
                                <label>Repetir Contraseña</label>
                                <div className="password-input">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="* * * * * * * *" 
                                        name="confirmPassword"
                                        value={form.confirmPassword} 
                                        onChange={handleChange}
                                    />
                                    <span onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <button className="submit-button">Registrar</button>
                        </form>
                        <div className="signup-link">
                            <p>¿Ya tienes una cuenta?</p>
                            <Link to="/ingresar">Ingresar</Link>
                        </div>
                    </div>
                </div>
                <div className="home-icon">
                    <Link to="/"> 
                        <FaArrowLeft className="back-arrow" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
