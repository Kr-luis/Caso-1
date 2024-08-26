import '../styles/inicial.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import epn from '../assets/epn.jpg'

export const PaginaInicial = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className="main">
                <section>
                    <nav>
                        <h1></h1>
                        <ul>
                            <li>
                                <Link to="/ingresar">Ingresar</Link>
                            </li>
                            <li>
                                <Link to="/registrar">Registrarse</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="text-center">
                        <h2>SISTEMA GESTOR DE MATRICULAS</h2>
                        <h3>Aquí podrás encontrar tiendas con productos gamer en Quito</h3>
                        <p>Encuentra variedad de productos y registra tu tienda para que más personas puedan encontrarte.</p>
                    </div>

                    <div className="bg-gradient">
                        <img src={epn} alt="EPN" />
                    </div>
                </section>
                <section>
                    {/* Aquí puedes agregar más secciones con contenido */}
                </section>
            </main>
        </div>
    );
};
