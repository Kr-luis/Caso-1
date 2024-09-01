import{
    CrearMatricula,
    VerMatricula,
    ActualizarMatricula,
    EliminarMatricula,
    detalleMatricula
} from "../controllers/matriculas_controller.js"
import {Router} from "express"

const route = Router()

route.post("/matriculas/crear", CrearMatricula)
route.get("/matriculas/ver", VerMatricula)
route.get("/matriculas/ver/:id", detalleMatricula)
route.put("/matriculas/actualizar/:id", ActualizarMatricula)
route.delete("/matriculas/eliminar/:id", EliminarMatricula)

export default route