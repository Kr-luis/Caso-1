import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Asegúrate de importar Bootstrap JS
import '../styles/Dashboard.css';
import matriculas from '../assets/matriculas.jpg';
import estudiantes from '../assets/estudiantes.webp';
import campus from '../assets/campus.jpeg';

const Dashboard = () => {
    const [idUsuario, setIdUsuario] = useState(null);
    const [email, setEmail] = useState(null);
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const idUsuarioLocalStorage = localStorage.getItem('id_usuario');
        const emailLocalStorage = localStorage.getItem('email');
        const nombreLocalStorage = localStorage.getItem('nombre');

        if (!idUsuarioLocalStorage || !emailLocalStorage) {
            navigate('/ingresar');
        } else {
            setIdUsuario(idUsuarioLocalStorage);
            setEmail(emailLocalStorage);
            setNombre(nombreLocalStorage);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/ingresar');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <Link to="/" className="back-arrow">
                    <FaArrowLeft />
                </Link>
                <h1 className="header-title">SISTEMA GESTOR DE MATRICULAS</h1>
                <nav className="header-nav">
                    <Link to="/dashboard/materias" className="nav-link">Materias</Link>
                    <Link to="/dashboard/estudiantes" className="nav-link">Estudiantes</Link>
                    <Link to="/dashboard/matriculas" className="nav-link">Matriculas</Link>
                </nav>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-content">
                    <h2 className="welcome-message">Bienvenido, {nombre}</h2>
                    <div id="dashboardCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={campus} className="d-block w-100" alt="Materias" />
                            </div>
                            <div className="carousel-item">
                                <img src={estudiantes} className="d-block w-100" alt="Estudiantes" />
                            </div>
                            <div className="carousel-item">
                                <img src={matriculas} className="d-block w-100" alt="Matriculas" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#dashboardCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#dashboardCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </section>
            </main>
            <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" />
            </button>
        </div>
    );
};

export default Dashboard;
