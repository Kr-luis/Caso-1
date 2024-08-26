import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import logoGamer from '../assets/gamer.png';

const Dashboard = () => {
    const [propietario, setPropietario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const propietarioLocalStorage = localStorage.getItem('propietario');
        const token = localStorage.getItem('token');
        setPropietario(propietarioLocalStorage === 'true');
        // if (!token) {
        //     navigate('/ingresar'); // Redirige si no cumple con las condiciones
        // }
    }, []);
    

    return (
        <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
            <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
                <h2 className='text-4xl font-black text-center text-white'>QuitoTech</h2>
                <hr className="border-blue-500" />
                <ul className="mt-5 flex flex-col space-y-4">
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to="/dashboard/buscar">Productos</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to="/dashboard/listartienda">
                                Buscar Tienda
                            </Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to={propietario ? "/dashboard/administrartienda" : "/dashboard/confirmacion"}>
                            {propietario ? "Administrar tienda" : "Registrar tienda"}
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center gap-4 border border-gray-700">
                    <hr className='my-2 w-full border-gray-600' />
                    <h2 className='text-3xl font-extrabold text-center text-white mb-1'>Conoce Más Sobre Nosotros</h2>
                    <hr className='my-2 w-full border-gray-600' />
                    <p className='text-white text-base mb-1'>
                    ¡Bienvenido a nuestra plataforma, el lugar ideal para los apasionados del gaming! Te ayudamos a encontrar las mejores tiendas especializadas en artículos gamer, desde componentes para PC hasta periféricos y videojuegos. Nuestra misión es conectar a jugadores con tiendas que ofrecen todo lo que necesitas. Compara productos, precios y servicios en nuestra base de datos, ya sea de tiendas locales o grandes cadenas. Si tienes una tienda de artículos gamer, regístrala con nosotros y haz que los gamers descubran tus productos y servicios, ampliando así tu alcance y visibilidad.
                    </p>
                    <p className='text-white text-base'>
                        Explora, descubre y encuentra las mejores tiendas para mejorar tu experiencia de juego.<b>¡Sé bienvenido a nuestro sistema!</b>
                    </p>
                    <div className='relative mx-auto w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mt-4'>
                        <img src={logoGamer} alt="logo-gamer" className="object-contain w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 left-4">
                    <Link to="/" onClick={() => { localStorage.clear() }}><img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" /></Link>
            </div>
        </div>
    );
};

export default Dashboard;
