import logoGamer from '../assets/gamer.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const PaginaInicial = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className='main bg-gray-900 px-10 md:px-20 lg:px-40'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>QuitoTECH</h1>
                        <ul className='flex items-center'>
                            <li>
                                <Link to="/ingresar" className="py-2 px-5  bg-purple-500 text-slate-300 border-width:0px rounded-full ml-8 hover:scale-210 duration-300 hover:bg-gray-800">
                                Ingresar
                                </Link>
                            </li>
                            <li>
                                <Link to="/registrar" className="py-2 px-5  bg-purple-500 text-slate-300 border-width:0px rounded-full ml-8 hover:scale-210 duration-300 hover:bg-gray-800">
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-purple-600 font-medium md:text-6xl'>
                            Tiendas en Quito para videojuegos
                        </h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>
                            Aqui podras encontrar tiendas con productos gamer en quito
                        </h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>
                            Podras encontrar variedad de productos y registrar tu tienda para que mas personas puedan encontrarte
                        </p>
                    </div>

                    <div className='relative mx-auto bg-gradient-to-| w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96'>
                        <img src={logoGamer} alt="logo-gamer" />
                    </div>
                </section>
                <section>
                </section>
                <section>
                </section>
            </main>
        </div>
    );
};
