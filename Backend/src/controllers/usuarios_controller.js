
import Usuario from "../models/usuarios.js"
// import generarJWT from "../helpers/crearJWT.js"
import mongoose from "mongoose";


const registro = async (req,res)=>{
    // Solicitud
    const {nombre, apellido, email,password} = req.body
    // Validaciones
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const permitido = /^[a-zA-ZÀ-ÿ\s]+$/; // Permite letras, espacios y acentos
    if (!permitido.test(nombre)) {
        return res.status(400).json({ msg: "El nombre solo puede contener letras y espacios" });
    }
    if (!permitido.test(apellido)) {
        return res.status(400).json({ msg: "El apellido solo puede contener letras y espacios" });
    }
    const verificarEmailBDD = await Usuario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"El email ya se encuentra registrado, intente con uno diferente"})
    // BDD
    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    nuevoUsuario.crearToken()
    await nuevoUsuario.save()
    // Respuesta
    res.status(200).json({msg:"Usuario registrado correctamente"})
}

const recuperarPassword = async (req,res)=>{
    const {email, nuevopassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    usuarioBDD.password = await usuarioBDD.encrypPassword(req.body.nuevopassword)
    usuarioBDD.save()
    res.status(200).json({msg:"La contraseña fue cambiada"})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email})
    if(usuarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    // const token = generarJWT(usuarioBDD._id,"usuario")
	const {nombre,apellido,_id} = usuarioBDD
    res.status(200).json({
        // token,
        nombre,
        apellido,
        _id,
        email:usuarioBDD.email,
    })
} 

export {
    registro,
    login,
    recuperarPassword
}