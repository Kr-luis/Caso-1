import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Mensaje from '../components/Alertas'
import AuthContext from '../../context/AuthProvider.jsx'
//import Mensaje from '../componets/Alertas/Mensaje'

const Ingresar = () => {
    const navigate = useNavigate()
    const { auth, setAuth } = useContext(AuthContext)
    const [mensaje, setMensaje] = useState({})
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => { 
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/login`
            const respuesta = await axios.post(url, form)
            console.log('Respuesta del servidor:', respuesta.data);

            localStorage.setItem('token', respuesta.data.token)
            localStorage.setItem('id_usuario', respuesta.data._id)
            localStorage.setItem('propietario', respuesta.data.propietario)
            localStorage.setItem('email', respuesta.data.email)
            console.log(localStorage.getItem("propietario"))
            setAuth(respuesta.data)
            navigate('/dashboard')
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setForm({})
            setTimeout(() => {
                setMensaje({})
            }, 3000)
        }
    }

    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
                <div className="relative z-10 w-full flex justify-center items-center">
                    <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row items-center justify-center">
                        <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
                            <h1 className="text-5xl text-center font-bold mb-4 text-white">Bienvenido a QuitoTech</h1>
                        </div>
                        <div className="md:w-1/2">
                            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className=" block text-sm font-semibold text-gray-300 mb-2">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        placeholder="Ingresa tu Correo Electrónico" 
                                        name='email'
                                        value={form.email || ""} 
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Contraseña</label>
                                    <input 
                                        type="password" 
                                        placeholder="* * * * * * * *" 
                                        name='password'
                                        value={form.password || ""} 
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                    />
                                </div>

                                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">Ingresar</button>
                            </form>
                            <div className="mt-6 text-center text-gray-400 text-xs">
                                <Link to="/forgot/id" className="underline hover:text-gray-300">Olvidaste tu contraseña?</Link>
                            </div>

                            <div className="mt-4 text-center text-sm text-gray-400">
                                <p>Aún no tienes cuenta?</p>
                                <Link to="/registrar" className="inline-block mt-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">Regístrate</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <Link to="/"> <img src="/public/images/casa.png" alt="Volver" className="w-16 h-16" /></Link>
                </div>
            </div>
        </>
    )
}

export default Ingresar
