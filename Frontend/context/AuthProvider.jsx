import axios from "axios"
import { createContext, useEffect, useState } from "react"


// Crei dek grupo de whatsapp
const AuthContext = createContext()
// Mensahe a transimit
const AuthProvider = ({ children }) => {
    // * Almacenar la info del usario - login
    const [auth, setAuth] = useState({
        nombre:"Alberto"
    })


    const perfil = async(token) => {
        try {
            // Mandar el token de bearer recoje el token del usuario
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth              
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext