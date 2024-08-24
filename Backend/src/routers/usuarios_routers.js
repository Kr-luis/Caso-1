import { Router } from "express";
// import verificarAutenticacion from '../middlewares/autenticacion.js'

import {
    login,
    registro,
	recuperarPassword,
} from "../controllers/usuarios_controller.js";

const router = Router()


router.post('/usuario/login',login)
router.post('/usuario/registro',registro)
router.post('/usuario/recuperar-password',recuperarPassword)





export default router