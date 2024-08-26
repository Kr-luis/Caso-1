import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de flecha
import AuthContext from '../../context/AuthProvider.jsx';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import '../styles/Ingresar.css';

const Ingresar = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext); // No es necesario `auth` si no lo usas
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/caso1/usuario/login`;
            const { data } = await axios.post(url, form); // Desestructurado para mejor legibilidad
            localStorage.setItem('token', data.token);
            localStorage.setItem('id_usuario', data._id);
            localStorage.setItem('propietario', data.propietario);
            localStorage.setItem('email', data.email);
            setAuth(data);

            Swal.fire({
                title: 'Éxito',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            }).then(() => {
                navigate('/dashboard');
            });

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.msg || 'No se logró iniciar sesión', // Mostrar error específico del backend
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            });
            setForm({ email: "", password: "" }); // Limpiar formulario tras error
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <div className="welcome-section">
                        <h1>Sistema de Matriculas</h1>
                    </div>
                    <div className="form-section">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Correo Electrónico</label>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu Correo Electrónico"
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="* * * * * * * *"
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className="submit-button" type="submit">Ingresar</button>
                        </form>
                        <div className="signup">
                            <p>Aún no tienes cuenta?</p>
                            <Link to="/registrar">Regístrate</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-icon">
                <Link to="/"> 
                    <FaArrowLeft className="back-arrow" /> {/* Aquí se usa el ícono de flecha */}
                </Link>
            </div>
        </div>
    );
};

export default Ingresar;
