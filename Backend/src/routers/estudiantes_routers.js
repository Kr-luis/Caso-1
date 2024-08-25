import{
    CrearEstudiante,
    VerEstudiante,
    ActualizarEstudiante,
    EliminarEstudiante
} from "../controllers/estudiantes_controller.js"

import {Router} from "express"

const route = Router()

route.post("/estudiante/crear", CrearEstudiante)
route.get("/estudiante/ver", VerEstudiante)
route.put("/estudiante/actualizar/:id", ActualizarEstudiante)
route.delete("/estudiante/eliminar/:id", EliminarEstudiante)

export default route
