import express from "express"
import doteenv from "dotenv"
import cors from "cors"

// Inicializar
const app = express()
doteenv.config()

// Configuraciones del puerto

app.set("port", process.env.port || 3000)
app.use(cors())

// Middlewares

app.use(express.json())

// Rutas

app.get("/", (req, res) => {
    res.send("Servidor levantado")
})

// exportar 

export default app
