import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de flecha
import AuthContext from '../../context/AuthProvider.jsx';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import '../styles/Ingresar.css';

const Ingresar = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/login`;
            const respuesta = await axios.post(url, form);
            localStorage.setItem('token', respuesta.data.token);
            localStorage.setItem('id_usuario', respuesta.data._id);
            localStorage.setItem('propietario', respuesta.data.propietario);
            localStorage.setItem('email', respuesta.data.email);
            setAuth(respuesta.data);
            
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
                text: 'No se logró iniciar sesión',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'custom-title',
                    content: 'custom-content'
                }
            });
            setForm({});
        }
    };

    return (
        <>
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
                                        value={form.email || ""} 
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Contraseña</label>
                                    <input 
                                        type="password" 
                                        placeholder="* * * * * * * *" 
                                        name='password'
                                        value={form.password || ""} 
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className="submit-button">Ingresar</button>
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
        </>
    );
};

export default Ingresar;
