import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de flecha
import Swal from 'sweetalert2'; // Importa SweetAlert2
import '../styles/Registrar.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importamos los íconos de ojo

export const Registrar = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación de contraseña

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

        // Validación básica
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
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/registro`;
            const respuesta = await axios.post(url, {
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
                // Redirige al usuario después del registro exitoso, si es necesario
                // Puedes redirigir a otra página aquí si lo deseas
            });

            setForm({
                email: "",
                password: "",
                confirmPassword: ""
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
                                <label>Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    placeholder="Ingresa tu Correo Electrónico" 
                                    name='email'
                                    value={form.email || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group password-group">
                                <label>Contraseña</label>
                                <div className="password-input">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="* * * * * * * *" 
                                        name='password'
                                        value={form.password || ""} 
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
                                        name='confirmPassword'
                                        value={form.confirmPassword || ""} 
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
                        <FaArrowLeft className="back-arrow" /> {/* Aquí se usa el ícono de flecha */}
                    </Link>
                </div>
            </div>
        </div>
    );
};
