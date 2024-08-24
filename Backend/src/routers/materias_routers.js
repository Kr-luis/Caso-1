import{
    CrearMateria,
    VerMaterias,
    ActualizarMateria,
    EliminarMateria
} from "../controllers/materias_controller.js"
import { Router } from "express"

const router = Router()

router.post("/materias/crear", CrearMateria)
router.get("/materias/ver", VerMaterias)
router.put("/materias/actualizar/:id", ActualizarMateria)
router.delete("/materias/eliminar/:id", EliminarMateria)

export default router