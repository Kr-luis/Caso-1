import express from "express"
import doteenv from "dotenv"
import cors from "cors"

import routerusuario from "./routers/usuarios_routers.js"
import routermatricula from "./routers/matriculas_routers.js"
import routermateria from "./routers/materias_routers.js"
import routerestudiante from "./routers/estudiantes_routers.js"

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

app.use("/caso1", routerusuario)
app.use("/caso1", routermateria)
app.use("/caso1", routerestudiante)
app.use("/caso1", routermatricula)

// exportar 

export default app
