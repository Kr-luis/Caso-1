import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Mensaje from '../components/Alertas.jsx';
import '../styles/Registrar.css';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'; // Importamos el ícono de flecha

export const Registrar = () => {
    const [mensaje, setMensaje] = useState({});
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
            setMensaje({ respuesta: 'Las contraseñas no coinciden', tipo: false });
            return;
        }
        if (form.password.length < 8) {
            setMensaje({ respuesta: 'La contraseña debe tener al menos 8 caracteres', tipo: false });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/registro`;
            const respuesta = await axios.post(url, {
                email: form.email,
                password: form.password,
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setForm({
                email: "",
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || 'Error desconocido', tipo: false });
        }
    };

    return (
        <div className="login-page">
            <Link to="/ingresar" className="back-arrow">
                <FaArrowLeft />
            </Link>
            <div className="login-container">
                <h2>REGISTRO AL SISTEMA</h2>
                <p>Ingresa tus datos para registrarte</p>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu email"
                            required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Contraseña:</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="* * * * * * * *"
                                required
                            />
                            <span onClick={toggleShowPassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="confirmPassword">Repetir Contraseña:</label>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="* * * * * * * *"
                                required
                            />
                            <span onClick={toggleShowConfirmPassword}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="button">Registrar</button>
                </form>
                <div className="signup-link">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/ingresar">Ingresar</Link>
                </div>
            </div>
        </div>
    );
};
