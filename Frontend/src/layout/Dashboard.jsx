import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/Dashboard.css';
import matriculas from '../assets/matriculas.jpg';
import estudiantes from '../assets/estudiantes.webp';
import materias from '../assets/materias.jpg';

const Dashboard = () => {
    const [idUsuario, setIdUsuario] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const idUsuarioLocalStorage = localStorage.getItem('id_usuario');
        const emailLocalStorage = localStorage.getItem('email');

        if (!idUsuarioLocalStorage || !emailLocalStorage) {
            navigate('/ingresar'); // Redirige al login si id_usuario o email están vacíos
        } else {
            setIdUsuario(idUsuarioLocalStorage);
            setEmail(emailLocalStorage);
        }
    }, [navigate]);

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
                    <div className="carousel">
                        <img src={materias} alt="Materias" className="carousel-image" />
                        <img src={estudiantes} alt="Estudiantes" className="carousel-image" />
                        <img src={matriculas} alt="Matriculas" className="carousel-image" />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
