import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Mensaje from '../components/Alertas.jsx';

export const Registrar = () => {
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
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
    
        // Validaciones manuales
        if (!form.nombre.trim()) {
            setMensaje({ respuesta: 'El nombre es obligatorio', tipo: false });
            return;
        }
        if (!form.apellido.trim()) {
            setMensaje({ respuesta: 'El apellido es obligatorio', tipo: false });
            return;
        }
        if (!form.direccion.trim()) {
            setMensaje({ respuesta: 'La dirección es obligatoria', tipo: false });
            return;
        }
        if (!/^[0-9]+$/.test(form.telefono)) {
            setMensaje({ respuesta: 'El teléfono debe contener solo números', tipo: false });
            return;
        }
        if (form.telefono.length < 10) {
            setMensaje({ respuesta: 'El teléfono debe tener al menos 10 dígitos', tipo: false });
            return;
        }
        if (!form.email.includes('@')) {
            setMensaje({ respuesta: 'Debe ser un correo electrónico válido', tipo: false });
            return;
        }
        if (form.password.length < 8) {
            setMensaje({ respuesta: 'La contraseña debe tener al menos 8 caracteres', tipo: false });
            return;
        }
    
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/registro`;
            const respuesta = await axios.post(url, form);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setForm({
                nombre: "",
                apellido: "",
                direccion: "",
                telefono: "",
                email: "",
                password: ""
            });
            console.log(respuesta);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || 'Error desconocido', tipo: false });
            console.log(error);
        }
    };
    

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="absolute inset-0 bg-[url('/images/paginalogin.png')] bg-cover bg-center"></div>
                <div className="relative z-10 w-full max-w-6xl bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-6">
                        <img src="/images/logo.png" alt="Logo" className="w-32" />
                    </div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h2 className="text-center text-3xl font-bold mb-6 text-white">Bienvenido a QuitoTech</h2>
                    <p className="text-center text-gray-400 mb-8">Ingresa tus detalles para registrarte</p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-white mb-2" htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-white mb-2" htmlFor="apellido">Apellido:</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                placeholder="Ingresa tu apellido"
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-white mb-2" htmlFor="direccion">Dirección:</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                placeholder="Ingresa tu dirección"
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-white mb-2" htmlFor="telefono">Teléfono:</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                placeholder="Ingresa tu teléfono"
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-white mb-2" htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu email"
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-white mb-2" htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="* * * * * * * * * * *"
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                                required
                            />
                        </div>
                        <div className="col-span-2 mb-4">
                            <button type="submit" className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300">Registrar</button>
                        </div>
                    </form>
                    <div className="mt-4 text-sm text-center">
                        <p className="text-gray-400">¿Ya tienes una cuenta?</p>
                        <Link to="/ingresar" className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">Ingresar</Link>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <Link to="/"> <img src="/images/casa.png" alt="Volver" className="w-16 h-16" /></Link>
                </div>
            </div>
        </>
    );
};
